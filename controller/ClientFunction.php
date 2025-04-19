<?php
	require_once '../controller/Authentication.php';
	require_once '../controller/ClientDataMapper.php';
	require_once '../controller/Utilities.php';
	require_once '../model/Client.php';
	
	class ClientFunction
	{
		const MODE_ADD = 1;
		const MODE_UPDATE = 2;
		const MODE_VOID = 3;
		
		const REPORT_FILE_PATH = "../reportFiles/";
		
		private $_dataMapper;
		
		public function ClientFunction()
		{
			$this->_dataMapper = new ClientDataMapper();
		}
		
		public function addClient($clientInfo)
		{
			try {
				$client = $this->generateClientModel($clientInfo, self::MODE_ADD);
				
				// Check existed memberships only in a case that clients use health fund 
				if ($client->isHealthFund()) {
					if ($this->_dataMapper->isExistedClientMember($client)) {
						$msg = 'Client with Health Fund ['.$clientInfo['health_fund_name'].'], Membership No. ['.$client->getMembershipNo().'] and Patient ID ['.$client->getPatientID().'] already existed, please check the infotmation.';
						return Utilities::getResponseResult(false, $msg);
					}
				}
				
				// Check existed names in every cases
				if ($this->_dataMapper->isExistedClientName($client)) {
					if ($client->isHealthFund())
						$msg = 'Client Name ['.$client->getFirstName().' '.$client->getLastName().'] with Health Fund ['.$clientInfo['health_fund_name'].'], Membership No ['.$client->getMembershipNo().'] and Patient ID ['.$client->getPatientID().'] already existed, please check the infotmation.';
					else
						$msg = 'Client Name ['.$client->getFirstName().' '.$client->getLastName().'] already existed, please check the infotmation.';
					
					return Utilities::getResponseResult(false, $msg);
				}
				
				$affectedRow = $this->_dataMapper->insertClient($client);
				
				if ($affectedRow > 0) {
					$this->_dataMapper->insertFindings($client);
					$this->_dataMapper->insertConditions($client);
					return Utilities::getResponseResult(true, 'New client has been added successfully.', $client->getID());
				}
				else {
					return Utilities::getResponseResult(false, 'Adding new client has failed!');
				}
			} catch(Exception $e) {
				throw $e;
			}
		} // addClient
		
		public function searchClients($search)
		{
			$result = $this->_dataMapper->searchClients($search);
			$countResult = count($result);
			
			if ($countResult > 0)
			{
				$msg = ($countResult > 1) ? 'The '.$countResult.' clients are found' : 'The only 1 client is found';
				return Utilities::getResponseResult(true, $msg, $result);
			}
			else 
			{
				return Utilities::getResponseResult(false, 'No clients have been found!');
			}
		} // searchClient
		
		public function getClientInfo($clientID)
		{
			$result = $this->_dataMapper->getClientInfo($clientID);
			
			if (count($result) > 0) {
				//$client = $this->generateClientModel($result[0], true);
				//return print_r($client);
				
				$clientInfo = $result[0];
				$clientInfo['client_birthday'] = $clientInfo['client_birthday'] != '0000-00-00' ? Utilities::convertDateForDisplay($clientInfo['client_birthday']) : "";
				$clientInfo['client_findings'] = $this->_dataMapper->getFindingsInfo($clientID);
				$clientInfo['client_conditions'] = $this->_dataMapper->getConditionsInfo($clientID);
				
				//return print_r(Utilities::getResponseResult(true, '', $client));
				return Utilities::getResponseResult(true, '', $clientInfo);
			}
			else {
				return Utilities::getResponseResult(false, 'There is no any clients who has id['.$clientID.'].');
			}
		} // getClientInfo
		
		public function updateClient($editedClientInfo)
		{
			$client = $this->generateClientModel($editedClientInfo, self::MODE_UPDATE);
			
			// Check existed memberships only in a case that clients use health fund
			if ($client->isHealthFund()) {
				if ($this->_dataMapper->isExistedClientMember($client)) {
					$msg = 'Client with Health Fund ['.$editedClientInfo['health_fund_name'].'], Membership No. ['.$client->getMembershipNo().'] and Patient ID ['.$client->getPatientID().'] already existed, please check the infotmation.';
					return Utilities::getResponseResult(false, $msg);
				}
			}
			
			// Check existed names in every cases
			if ($this->_dataMapper->isExistedClientName($client)) {
				if ($client->isHealthFund())
					$msg = 'Client Name ['.$client->getFirstName().' '.$client->getLastName().'] with Health Fund ['.$clientInfo['health_fund_name'].'], Membership No ['.$client->getMembershipNo().'] and Patient ID ['.$client->getPatientID().'] already existed, please check the infotmation.';
				else
					$msg = 'Client Name ['.$client->getFirstName().' '.$client->getLastName().'] already existed, please check the infotmation.';
					
				return Utilities::getResponseResult(false, $msg);
			}
			
			$affectedRow = $this->_dataMapper->updateClient($client);
			
			if ($affectedRow > 0) {
				$this->_dataMapper->updateClientFindings($client->getFindings());
				$this->_dataMapper->updateClientConditions($client->getConditions());
				
				return Utilities::getResponseResult(true, 'Client information has been updated successfully.', $editedClientInfo);
			}
			else {
				return Utilities::getResponseResult(false, 'Updating client information has failed!');
			}
		} // updateClient
		
		private function generateClientModel($clientInfo, $mode = self::MODE_ADD)
		{
			$client;
			
			switch ($mode) {
				case self::MODE_ADD :
					$client = new Client(Utilities::getUniqueID());
					$client->setCreateUser(Authentication::getUser()->getID());
					$client->setCreateDateTime(Utilities::getDateTimeNowForDB());
					break;
				case self::MODE_UPDATE:
					$client = new Client($clientInfo['client_id']);
					$client->setUpdateUser(Authentication::getUser()->getID());
					$client->setUpdateDateTime(Utilities::getDateTimeNowForDB());
					break;
				case self::MODE_VOID:
					$client = new Client($clientInfo['client_id']);
					$client->setVoidUser(Authentication::getUser()->getID());
					$client->setVoidDateTime(Utilities::getDateTimeNowForDB());
					break;
			}
			
			$client->setPatientID($clientInfo['client_patient_id']);
			//$client->setPatientID(empty($clientInfo['client_patient_id']) ? 1 : $clientInfo['client_patient_id']);
			$client->setBirthday(empty($clientInfo['client_birthday']) ? "1900-01-01" : Utilities::convertDateForDB($clientInfo['client_birthday']));
			
			$client->setFindings($this->generateClientFindingModels($client->getID(), $clientInfo['client_findings']));
			$client->setConditions($this->generateClientConditionModels($client->getID(), $clientInfo['client_conditions']));
			
			$client->setMembershipNo($clientInfo['client_membership_no']);
			$client->setHealthFundID($clientInfo['health_fund_id']);
			$client->setFirstName(ucwords(strtolower($clientInfo['client_first_name'])));
			$client->setLastName(ucwords(strtolower($clientInfo['client_last_name'])));
			$client->setGender($clientInfo['client_gender']);
			$client->setAddress($clientInfo['client_address']);
			$client->setPostCode($clientInfo['client_postcode']);
			$client->setEmail($clientInfo['client_email']);
			$client->setContactNo($clientInfo['client_contact_no']);
			$client->setOccupation($clientInfo['client_occupation']);
			$client->setSports($clientInfo['client_sports']);
			$client->setOtherConditions($clientInfo['client_other_conditions']);
			$client->setEmergencyContactName($clientInfo['client_emergency_contact_name']);
			$client->setEmergencyContactNo($clientInfo['client_emergency_contact_no']);
			
			return $client;
		} // generateClientModel
		
		private function generateClientFindingModels($clientID, $clientFindingsInfo)
		{
			$clientFindings = array();
			$clientFinding;
			
			foreach ($clientFindingsInfo as $finding) {
				$clientFinding = new ClientFinding($clientID, $finding['finding_type_id']);
				
				//$checked = ($finding['client_finding_checked'] === 'true') ? true : false;
				//$clientFinding->setChecked($checked);
				$clientFinding->setChecked($finding['client_finding_checked']);
				
				if ($clientFinding->getChecked() === 'true')
					$clientFinding->setRemark($finding['client_finding_remark']);
				
				array_push($clientFindings, $clientFinding);
			}
			
			return $clientFindings;
		} // generateClientFindingModels
		
		private function generateClientConditionModels($clientID, $clientConditionsInfo)
		{
			$clientConditions = array();
			$clientCondition;
				
			foreach ($clientConditionsInfo as $condition) {
				$clientCondition = new ClientCondition($clientID, $condition['condition_type_id']);
				
				//$checked = ($condition['client_condition_checked'] === 'true') ? true : false;
				//$clientCondition->setChecked($checked);
				$clientCondition->setChecked($condition['client_condition_checked']);
				
				if ($clientCondition->getChecked() === 'true')
					$clientCondition->setRemark($condition['client_condition_remark']);
		
				array_push($clientConditions, $clientCondition);
			}
				
			return $clientConditions;
		} // generateClientConditionModels
		
		public function addReport($reportInfo)
		{
			$reportInfo['report_id'] = Utilities::getUniqueID();
			$reportInfo['report_hour'] = $reportInfo['report_hour'] / 60.0;
			$reportInfo['report_date'] = Utilities::convertDateForDB($reportInfo['report_date']);
			
			$therapist = Authentication::getUser();
			
			$reportInfo['report_create_user'] = $therapist->getID();
			$reportInfo['report_create_datetime'] = Utilities::getDateTimeNowForDB();
			$reportInfo['report_update_user'] = $therapist->getID();
			$reportInfo['report_update_datetime'] = Utilities::getDateTimeNowForDB();
			
			$afffectedRow = $this->_dataMapper->insertReport($reportInfo);
			
			if ($afffectedRow > 0)
			{
			    $this->_dataMapper->updateReportMuscleTreatments($reportInfo);
			    
				return Utilities::getResponseResult(true, 'The report has been added successfully.', $reportInfo);
			}
			else
			{
				return Utilities::getResponseResult(false, 'Adding new report has been failed!');
			}
		} // addClientReport
		
		public function addReportWithFile($reportInfo, $file)
		{
		    $reportId = Utilities::getUniqueID();
		    $reportInfo['report_id'] = $reportId;
		    $reportInfo['report_hour'] = $reportInfo['report_hour'] / 60.0;
		    $reportInfo['report_date'] = Utilities::convertDateForDB($reportInfo['report_date']);
		    
		    $therapist = Authentication::getUser();
		    
		    $reportInfo['report_create_user'] = $therapist->getID();
		    $reportInfo['report_create_datetime'] = Utilities::getDateTimeNowForDB();
		    $reportInfo['report_update_user'] = $therapist->getID();
		    $reportInfo['report_update_datetime'] = Utilities::getDateTimeNowForDB();
		    
		    $fileName = null;
		    if ($file !== null) {
		        Utilities::createDirectoryIfNotExist(self::REPORT_FILE_PATH);
		        
		        $fileName = Utilities::getUniqueFileName($file, $reportId);		        
		        $reportInfo['report_file'] = $fileName;
		    } else {
		        $reportInfo['report_file'] = '';
		    }
		    
		    $afffectedRow = $this->_dataMapper->insertReport($reportInfo);
		    
		    if ($afffectedRow > 0)
		    {
		        $this->_dataMapper->updateReportMuscleTreatments($reportInfo);
		        
		        // Uploading file
		        if ($fileName !== null) {
		            $filePath = self::REPORT_FILE_PATH.$fileName;
		            Utilities::uploadReportFile($file, $filePath, $reportId);
		        }
		        
		        return Utilities::getResponseResult(true, 'The report has been added successfully.', $reportInfo);
		    }
		    else
		    {
		        return Utilities::getResponseResult(false, 'Adding new report has been failed!');
		    }
		} // addReportWithFile
		
		public function getReports($clientID)
		{
			$reports = $this->_dataMapper->getReports($clientID);
				
			if (count($reports) > 0)
			{
			    for ($i = 0; $i < count($reports); $i++)
			    {
			        $reports[$i]['report_muscle_treatment_ids'] = [];
			        
			        $muscleTreatments = $this->_dataMapper->getMuscleTreatmentsByReport($reports[$i]['report_id']);
			        if (count($muscleTreatments) > 0)
			        {
			            $muscleTreatmentIDs = [];
			            for ($j = 0; $j < count($muscleTreatments); $j++)
			            {
			                $muscleTreatmentIDs[$j] = intval($muscleTreatments[$j]['muscle_id']);
			            }
			            
			            $reports[$i]['report_muscle_treatment_ids'] = $muscleTreatmentIDs;
			        }
			    }
			    
			    return Utilities::getResponseResult(true, '', $reports);
			}
			else
			{
				return Utilities::getResponseResult(false, 'Client reports are not found!');
			}
		} // getReports
		
		public function getReportsWithFullMuscleTreatments($clientID)
		{
		    $reports = $this->_dataMapper->getReports($clientID);
		    
		    if (count($reports) > 0)
		    {
		        for ($i = 0; $i < count($reports); $i++)
		        {
		            $reports[$i]['report_muscle_treatments'] = [];
		            
		            $muscleTreatments = $this->_dataMapper->getMuscleTreatmentsByReport($reports[$i]['report_id']);
		            if (count($muscleTreatments) > 0)
		            {
		                $reports[$i]['report_muscle_treatments'] = $muscleTreatments;
		            }
		        }
		        
		        return Utilities::getResponseResult(true, '', $reports);
		    }
		    else
		    {
		        return Utilities::getResponseResult(false, 'Client reports are not found!');
		    }
		} // getReportsWithFullMuscleTreatments
		
		public function updateReportItem($reportItemInfo)
		{
			$therapist = Authentication::getUser();
			
			$reportItemInfo['report_hour'] = $reportItemInfo['report_hour'] / 60.0;
			$reportItemInfo['report_update_user'] = $therapist->getID();
			$reportItemInfo['report_update_datetime'] = Utilities::getDateTimeNowForDB();
			
			$affectedRow = $this->_dataMapper->updateReportItem($reportItemInfo);
			
			if ($affectedRow > 0) {
				$reportItemInfo['report_hour'] = $reportItemInfo['report_hour'] * 60.0;
				$reportItemInfo['report_update_user'] = $therapist->getName();
				$reportItemInfo['report_update_datetime'] = Utilities::convertDatetimeForDisplay($reportItemInfo['report_update_datetime']);
				
				$this->_dataMapper->updateReportMuscleTreatments($reportItemInfo);
				
				return Utilities::getResponseResult(true, 'Report information has been updated successfully.', $reportItemInfo);
			}
			else {
				return Utilities::getResponseResult(false, 'Updating report has failed!', $reportItemInfo);
			}
		} // updateReportItem
		
		public function deleteReportItem($reportItemInfo)
		{
			$therapist = Authentication::getUser();
				
			$reportItemInfo['report_void_user'] = $therapist->getID();
			$reportItemInfo['report_void_datetime'] = Utilities::getDateTimeNowForDB();
			
			$affectedRow = $this->_dataMapper->deleteReportItem($reportItemInfo);
				
			if ($affectedRow > 0)
				return Utilities::getResponseResult(true, 'The report has been deleted successfully.');
			else
				return Utilities::getResponseResult(false, 'Deleting the report has been failed!');
		} // deleteReportItem
		
		public function getTherapists() // *** Use getTherapists() in TherapistFunction instead
		{
			$result = $this->_dataMapper->getTherapists();
			
			if (count($result) > 0) {
				return Utilities::getResponseResult(true, '', $result);	
			}
			else {
				Utilities::logInfo("There is no therapist data in the system.");
				return Utilities::getResponseResult(false, 'There is no therapist data in the system!');
			}
		} // getTherapists
		
		public function getBookingHistory($search)
		{
			$result = $this->_dataMapper->getBookingHistory($search);
			$countResult = count($result);
				
			if ($countResult > 0)
			{
				$msg = ($countResult > 1) ? 'The '.$countResult.' bookins are found' : 'The only 1 booking is found';
				return Utilities::getResponseResult(true, $msg, $result);
			}
			else
			{
				return Utilities::getResponseResult(false, 'No bookings found!');
			}
		} // getBookingHistory
		
		public function getMuscles()
		{
		    $result = $this->_dataMapper->getMuscles();
		    $countResult = count($result);
		    
		    if ($countResult > 0)
		    {
		        $msg = 'The '.$countResult.' muscles are found';
		        return Utilities::getResponseResult(true, $msg, $result);
		    }
		    else
		    {
		        return Utilities::getResponseResult(false, 'No muscles found!');
		    }
		} // getMuscles
		
		public function addReportTemplate($reportInfo)
		{
		    $therapist = Authentication::getUser();
		    
		    $reportInfo['report_template_create_user'] = $therapist->getID();
		    $reportInfo['report_template_create_datetime'] = Utilities::getDateTimeNowForDB();
		    $reportInfo['report_template_update_user'] = $therapist->getID();
		    $reportInfo['report_template_update_datetime'] = Utilities::getDateTimeNowForDB();
		    
		    $newInsertId = $this->_dataMapper->addReportTemplate($reportInfo);
		    
		    if ($newInsertId > 0)
		    {
		        $reportInfo['report_template_id'] = $newInsertId;
		        $this->_dataMapper->updateReportTemplateMuscleTreatments($reportInfo);
		        
		        return Utilities::getResponseResult(true, 'The report template has been added successfully.', $reportInfo);
		    }
		    else
		    {
		        return Utilities::getResponseResult(false, 'Adding new report template has been failed!');
		    }
		} // addReportTemplate
		
		public function getReportTemplates()
		{
		    $result = $this->_dataMapper->getReportTemplates();
		    
		    for ($i = 0; $i < count($result); $i++) {
		        $result[$i]['report_muscle_treatment_ids'] = [];		        
		        $muscleTreatments = $this->_dataMapper->getReportTemplateMuscleTreatments($result[$i]['report_template_id']);
		        
		        $muscleTreatmentIDs = [];
		        foreach ($muscleTreatments as $treatment) {
		            array_push($muscleTreatmentIDs, intval($treatment['muscle_id']));
		        }
		        
		        //$each['report_template_muscle_treatment_ids'] = $muscleTreatmentIDs;
		        $result[$i]['report_template_muscle_treatment_ids'] = $muscleTreatmentIDs;
		    }
		    
		    if (count($result) > 0) {
		        return Utilities::getResponseResult(true, '', $result);
		    }
		    else {
		        Utilities::logInfo("There is no report template data in the system.");
		        return Utilities::getResponseResult(true, 'There is no report template data in the system!');
		    }
		} // getReportTemplates
		
		public function deleteReportTemplate($reportTemplateInfo)
		{
		    $user = Authentication::getUser();
		    
		    $reportTemplateInfo['report_template_void_user'] = $user->getID();
		    $reportTemplateInfo['report_template_void_datetime'] = Utilities::getDateTimeNowForDB();
		    
		    $affectedRow = $this->_dataMapper->deleteReportTemplate($reportTemplateInfo);
		    
		    if ($affectedRow > 0)
		        return Utilities::getResponseResult(true, 'The report template has been deleted successfully.');
	        else
	            return Utilities::getResponseResult(false, 'Deleting the report template has been failed!');
		}
		
		public function updateReportTemplate($reportTemplateInfo)
		{
		    $user = Authentication::getUser();
		    
		    $reportTemplateInfo['report_template_update_user'] = $user->getID();
		    $reportTemplateInfo['report_template_update_datetime'] = Utilities::getDateTimeNowForDB();
		    
		    $affectedRow = $this->_dataMapper->updateReportTemplate($reportTemplateInfo);
		    
		    if ($affectedRow > 0) {
		        $affectedRow = $this->_dataMapper->updateReportTemplateMuscleTreatments($reportTemplateInfo);
		        
		        if ($affectedRow > 0) {
		            return Utilities::getResponseResult(true, 'The report template has been updated successfully.', $reportTemplateInfo);
		        } else {
		            return Utilities::getResponseResult(true, 'Updating the muscle treatment of report template has been failed!', $reportTemplateInfo);
		        }
		    }
		    else {
		        return Utilities::getResponseResult(false, 'Updating the report template has been failed!', $reportTemplateInfo);
		    }
		}
	}
?>









