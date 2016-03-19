<?php
	require_once '../model/Client.php';
	require_once '../controller/DataAccess.php';
	
	class ClientDataMapper
	{
		private $_dataAccess;
		
		public function ClientDataMapper()
		{
			$this->_dataAccess = new DataAccess();
		}
		
		public function isClientExist($client)
		{
			try {
				$sql_format = "
						select client_id
						from client
						where client_membership_no = '%s'
							and client_patient_id = %d";
					
				$sql = sprintf($sql_format,
						$client->getMembershipNo(),
						$client->getPatientID());
					
				$result = $this->_dataAccess->select($sql);
					
				if (count($result) > 0)
						return true;
					else
						return false;
		
			} catch (Exception $e) {
				throw $e;
			}
		} // isClientExist
		
		public function insertClient($client)
		{
			try {
				$sql_format = "
insert into client (
	client_id, client_membership_no, client_patient_id, health_fund_id 
	, client_first_name, client_last_name, client_gender, client_address
	, client_postcode, client_email, client_contact_no, client_birthday
	, client_occupation, client_sports, client_other_conditions
	, client_emergency_contact_name, client_emergency_contact_no
	, client_create_user, client_create_datetime)
values (
	'%s', '%s', %d, %d
	,'%s', '%s', %d, '%s'
	,'%s', '%s', '%s', '%s'
	,'%s', '%s', '%s'
	,'%s', '%s'
	,'%s', '%s')";
				
				$sql = sprintf($sql_format
						, $client->getID(), $client->getMembershipNo(), $client->getPatientID(), $client->getHealthFundID()
						, $client->getFirstName(), $client->getLastName(), $client->getGender(), $client->getAddress()
						, $client->getPostcode(), $client->getEmail(), $client->getContactNo(), $client->getBirthday()
						, $client->getOccupation(), $client->getSports(), $client->getOtherConditions()
						, $client->getEmergencyContactName(), $client->getEmergencyContactNo()
						, $client->getCreateUser(), $client->getCreateDateTime());
				
				//return $sql;
				return $this->_dataAccess->insert($sql);
			} catch (Exception $e) {
				throw $e;
			}
		} // insertClient
	}
?>









