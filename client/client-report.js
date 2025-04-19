var _clientID;
var _clientInfo;
var _reports;
var _therapistOptions;
var _providerOptions;
var _muscleOptions;
var _muscleDataList;
var _reportTemplates;
var _reportTemplateOptions;

var $btnEditClient;
var $btnUpdateClient;
var $btnCancelEdit;
var $btnAddReport;
var $btnPrintReport;
var $btnPrintReceipt;

var $ddlReportProvider, $ddlReportTherapist, $txtReportDate, $ddlReportHour, $txtReportDetail, $txtReportRecom, $ddlMuscle, $txtReportPrice;
var $popupPrintReceipt, $txtReceiptDate, $txtReceiptValue, $ddlProvider;
var $ddlReportTemplate;
var $panelReportContainer;
var $inputReportFile;

var prefixPanelItem = '#panelItem';
var prefixBtnEditItem = '#btnEditItem';
var prefixBtnDeleteItem = '#btnDeleteItem';
var prefixBtnUpdateItem = '#btnUpdateItem';
var prefixBtnCancelItem = '#btnCancelItem';
var prefixItemProvider = '#ddlItemProvider';
var prefixItemTherapist = '#ddlItemTherapist';
var prefixItemHour = '#ddlItemHour';
var prefixItemDetail = '#txtItemDetail';
var prefixItemRecom = '#txtItemRecom';
var prefixItemUpdateUser = '#lblItemUpdateUser';
var prefixItemUpdateDatetime = '#lblItemUpdateDatetime';
var prefixItemMuscle = '#ddlItemMuscle';
var prefixItemReportTemplate = '#ddlItemReportTemplate';
var prefixItemReportTemplate_NoSelector = 'ddlItemReportTemplate';
var prefixItemReportPrice = '#txtItemReportPrice';
var prefixBtnItemViewReportFile = '#btnItemViewReportFile';
var prefixInputItemReportFile= '#inputItemReportFile';

var panelItemTemplate = "<div id=\"panelItem{0}\" class=\"panel panel-warning\"> <div class=\"panel-heading\"> <div class=\"row\"> <div class=\"col-sm-6\"> <div class=\"panel-title\"> <b>Report on</b> <span id=\"lblItemDate{0}\">{2}</span> </div> </div> <div class=\"col-sm-6 text-right\"> <button type=\"button\" id=\"btnEditItem{0}\" class=\"btn btn-info btn-xs\" name=\"{0}\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span> Edit</button> <button type=\"button\" id=\"btnDeleteItem{0}\" class=\"btn btn-danger btn-xs\" name=\"{0}\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>Delete</button> <button type=\"button\" id=\"btnUpdateItem{0}\" class=\"btn btn-warning btn-xs\" name=\"{1}\"><span class=\"glyphicon glyphicon-floppy-save\" aria-hidden=\"true\"></span> Update</button> <button type=\"button\" id=\"btnCancelItem{0}\" class=\"btn btn-default btn-xs\" name=\"{1}\">Cancel</button> </div></div> </div> <div class=\"panel-body\"> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Therapist</label><div class=\"col-xs-8 col-sm-5\"><select id=\"ddlItemProvider{0}\" class=\"form-control\" disabled>{10}</select></div><label class=\"col-xs-4 col-sm-1 control-label\">Hours</label><div class=\"col-xs-8 col-sm-3\"> <select id=\"ddlItemHour{0}\" class=\"form-control\" disabled> <option value=\"30\">30 Min</option> <option value=\"45\">45 Min</option> <option value=\"60\" selected>1 Hr</option> <option value=\"75\">1 Hr 15 Min</option> <option value=\"90\">1 Hr 30 Min</option> <option value=\"105\">1 Hr 45 Min</option> <option value=\"120\">2 Hr</option> <option value=\"135\">2 Hr 15 Min</option> <option value=\"150\">2 Hr 30 Min</option> <option value=\"165\">2 Hr 45 Min</option> <option value=\"180\">3 Hr</option> <option value=\"195\">3 Hr 15 Min</option> <option value=\"210\">3 Hr 30 Min</option> <option value=\"225\">3 Hr 45 Min</option> <option value=\"240\">4 Hr</option> </select> </div> </div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Remark</label> <div class=\"col-xs-8 col-sm-3\"> <select id=\"ddlItemTherapist{0}\" class=\"form-control\" disabled> {9} </select> </div></div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Price</label> <div class=\"col-xs-8 col-sm-2\"> <input type=\"text\" id=\"txtItemReportPrice{0}\" class=\"form-control\" /> </div></div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Template</label> <div class=\"col-xs-8 col-sm-9\"> <select id=\"ddlItemReportTemplate{0}\" class=\"form-control\" disabled> {12} </select> </div> </div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Muscle Treatment</label> <div class=\"col-xs-8 col-sm-9\"> <select id=\"ddlItemMuscle{0}\" class=\"form-control\" multiple disabled> {11} </select> </div> </div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Massage Details</label> <div class=\"col-xs-8 col-sm-9\"> <textarea id=\"txtItemDetail{0}\" rows=\"6\" class=\"form-control\" readonly>{3}</textarea> </div> </div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">Recommendations</label> <div class=\"col-xs-8 col-sm-9\"> <textarea id=\"txtItemRecom{0}\" rows=\"3\" class=\"form-control\" readonly>{4}</textarea> </div> </div> <div class=\"form-group\"> <label class=\"col-xs-4 col-sm-3 control-label\">File</label> <div class=\"col-xs-8 col-sm-9\"> <a role=\"button\" id=\"btnItemViewReportFile{0}\" class=\"btn btn-primary btn-md\" href=\"{13}\" target=\"_blank\"> <span class=\"glyphicon glyphicon-picture\" aria-hidden=\"true\"></span> View File </a> </div> </div> <div class=\"form-group\"> <div class=\"col-xs-offset-4 col-sm-offset-3 col-xs-8 col-sm-9\"> <input id=\"inputItemReportFile{0}\" class=\"form-control\" type=\"file\" accept=\".jpg, .jpeg, .png, .pdf\" /> </div> </div> </div> <div class=\"panel-footer hidden\"> <small> <b>Created by:</b> <span id=\"lblItemCreateUser{0}\">{5}</span> <b>Created on:</b> <span id=\"lblItemCreateDatetime{0}\">{6}</span> <b>Updated by:</b> <span id=\"lblItemUpdateUser{0}\">{7}</span> <b>Updated on:</b> <span id=\"lblItemUpdateDatetime{0}\">{8}</span> </small> </div> </div>";

function initPage()
{
	main_ajax_success_hide_loading();
	
	_clientID = main_get_parameter('id');
	//alert(_clientID + ' | ' + _clientID.length);
	
	if (_clientID != null && _clientID.length > 0) {
		initElementVariables();
		$txtEmail.inputmask('email');
		$txtBirthday.inputmask('date');
		$txtContactNo.inputmask('9999-999-999');
		$txtEmerConNo.inputmask('9999-999-999');
		$txtPatientID.TouchSpin({
			verticalbuttons: true,
			min: 0,
			max: 9
		});
		
		getClientInfo(_clientID);
		
		$btnEditClient = $('#btnEditClient');
		$btnUpdateClient = $('#btnUpdateClient');
		$btnCancelEdit = $('#btnCancelEdit');
		$btnAddReport = $('#btnAddReport');
		$btnPrintReport = $('#btnPrintReport');
		$btnPrintReceipt = $('#btnPrintReceipt');
		
		$panelReportContainer = $('#panelReportContainer');
		$ddlReportProvider = $('#ddlReportProvider');
		$ddlReportTherapist = $('#ddlReportTherapist');
		$txtReportDate = $('#txtReportDate');
		$ddlReportHour = $('#ddlReportHour');
		$txtReportDetail = $('#txtReportDetail');
		$txtReportRecom = $('#txtReportRecom');
		$ddlMuscle = $('#ddlMuscle');
		$ddlReportTemplate = $('#ddlReportTemplate');
		
		$popupPrintReceipt = $('#popupPrintReceipt');
		$txtReceiptDate = $('#txtReceiptDate');
		$txtReceiptValue = $('#txtReceiptValue');
		$ddlProvider = $('#ddlProvider');
		
		$txtReportDate.inputmask('date');
		$txtReportDate.val(main_convert_date_format(new Date())); // default Report Date = today
		$txtReceiptDate.inputmask('date');
		$txtReceiptDate.val(main_convert_date_format(new Date())); // default Receipt Date = today
		$txtReceiptValue.autoNumeric('init', { vMin: 0, vMax: 999, aSign: '$' });
		
		initProviders();
		initMuscles();
		initReportTemplates();
		
		$txtReportPrice = $('#txtReportPrice');
		initMoneyInput($txtReportPrice, 0, 1000.99);
		
		$inputReportFile = $('#inputReportFile');
		
		$btnEditClient.click(function(){
			setEditMode();
		});
		
		$btnUpdateClient.click(function(){
			if (validateInputs()) {
				main_confirm_message('Do you want to update client information?', updateClient, function(){ $btnUpdateClient.focus(); });
			}
		});
		
		$btnCancelEdit.click(function(){
			cancelEditClient();
		});
		
		$btnAddReport.click(function(){
			if (validateReportInputs())
				main_confirm_message('Do you want to add a report?', addReport, function(){ $btnAddReport.focus(); });
		});
		
		$btnPrintReport.click(function(){
    		main_open_new_tab('../report/report.php?report_type=CLIENT_REPORT&client_id=' + _clientID);
    	});
		
		$btnPrintReceipt.click(function(){
			if (validateReceiptDetails()) {
				// get date and value
				var receiptDate = $txtReceiptDate.val();
				var receiptValue = $txtReceiptValue.val();
				var providerNo = $ddlProvider.find('option:selected').text();
	    		main_open_new_tab('../report/report.php?report_type=CLIENT_RECEIPT&client_id=' + _clientID + '&receipt_date=' + receiptDate + '&receipt_value=' + receiptValue + '&provider_no=' + providerNo);
	    		
	    		$popupPrintReceipt.modal('hide');
			}
    	});
		
		$popupPrintReceipt.on('shown.bs.modal', function (e) {
			$txtReceiptDate.val(main_convert_date_format(new Date()));
			$txtReceiptValue.val('');
			$txtReceiptDate.focus();
		})
		
		$txtReceiptDate.keypress(function(e){
			if (e.which == 13) {
				$txtReceiptValue.focus();
				return false;
			} 
		});
		
		$txtReceiptValue.keypress(function(e){
			if (e.which == 13) {
				$btnPrintReceipt.click();
				return false;
			} 
		});
		
		$txtReportDetail.keypress(function(e){
			if (e.which == 13) {
				//$txtReportRecom.focus();
				//return false;
			} 
		});
		
		$txtReportRecom.keypress(function(e){
			if (e.which == 13) {
				//$btnAddReport.click();
				//return false;
			}
		});
		
		$ddlProvider.change(function(){
			if ($(this).val() === 'ADD_NEW_PROVIDER') // "ADD NEW PROVIDER" selected 
			{
				main_open_child_window('../provider/provider.php', initProviders);
				main_set_dropdown_index(this);
			}
		});
		
		$ddlReportTemplate.change(function(){
			const selectedTemplateId = $(this).val();
			if (selectedTemplateId > 0) {
				const selectedTemplate = _reportTemplates.find(x => x.report_template_id == selectedTemplateId);				
				prefillReport(selectedTemplate);
				
				// Resetting value to default
				// $(this).val('-1');
			} else if (selectedTemplateId == 0) {
				prefillReport(null);
			}
		});
	}
	else {
		// If clientID is null or empty, go back to search page
		main_redirect('../client/client-search.php');
	}
}

function initTherapists()
{
	main_request_ajax('../therapist/therapist-boundary.php', 'GET_THERAPIST_WITH_UNKNOWN', {}, onGetTherapistsDone);
}

function onGetTherapistsDone(response)
{
	if (response.success) {
		_therapistOptions = [];
		therapists = response.result;

		$.each(therapists, function (i, therapist){
			option = "<option value='" + therapist['therapist_id'] + "'>" + therapist['therapist_name'] + "</option>";
			
			_therapistOptions.push(option);
			$ddlReportTherapist.append(option);
			
			//if (therapist['therapist_name'] != '[Voucher]') { }
		});
		
		getReports();
	}
}

function getClientInfo(clientID)
{
	main_request_ajax('client-boundary.php', 'GET_CLIENT_INFO', clientID, onGetClientInfoDone);
}

function onGetClientInfoDone(response)
{
	if (response.success) {
		_clientInfo = response.result;
		
		setClientInfo(_clientInfo);
		
		initTherapists();
		//getReports();
	}
	else {
		main_alert_message(response.msg);
	}
}

function setClientInfo(clientInfo)
{
	$ddlHealthFund.val(clientInfo[HEALTH_FUND_ID]);
	$txtMemNo.val(clientInfo[MEMBERSHIP_NO]);
	$txtPatientID.val(clientInfo[PATIENT_ID]);
	$txtFirstName.val(clientInfo[FIRST_NAME]);
	$txtLastName.val(clientInfo[LAST_NAME]);
	$txtAddress.val(clientInfo[ADDRESS]);
	$txtPostcode.val(clientInfo[POSTCODE]);
	$txtEmail.val(clientInfo[EMAIL]);
	$txtContactNo.val(clientInfo[CONTACT_NO]);
	$txtBirthday.val(clientInfo[BIRTHDAY]);
	$txtOccupation.val(clientInfo[OCCUPATION]);
	$txtSports.val(clientInfo[SPORTS]);
	$txtOtherCon.val(clientInfo[OTHER_CON]);
	$txtEmerConName.val(clientInfo[EMER_CON_NAME]);
	$txtEmerConNo.val(clientInfo[EMER_CON_NO]);	
	
	clientInfo[GENDER] == false ? $radMale.prop('checked', true) : $radFemale.prop('checked', true);
	
	setClientFindings(clientInfo['client_findings']);
	setClientConditions(clientInfo['client_conditions']);
	
	toggleHealthFundClinetInputs();
}

function setClientFindings(clientFindings)
{
	for (var i = 0; i < clientFindings.length; i++) {
		//alert(clientFindings[i]['finding_type_suffix'] + ' | ' + clientFindings[i]['client_finding_checked']);
		if (clientFindings[i]['client_finding_checked'] == true || clientFindings[i]['client_finding_checked'] == 'true')
			$('#cb' + clientFindings[i]['finding_type_suffix']).prop('checked', true);
		else
			$('#cb' + clientFindings[i]['finding_type_suffix']).prop('checked', false);
		
		if ($('#txt' + clientFindings[i]['finding_type_suffix']).length)
			$('#txt' + clientFindings[i]['finding_type_suffix']).val(clientFindings[i]['client_finding_remark']);
	}
}

function setClientConditions(clientConditions)
{
	for (var i = 0; i < clientConditions.length; i++) {
		//alert(clientConditions[i]['condition_type_suffix']);
		if (clientConditions[i]['client_condition_checked'] == true || clientConditions[i]['client_condition_checked'] == 'true')
			$('#cb' + clientConditions[i]['condition_type_suffix']).prop('checked', true);
		else
			$('#cb' + clientConditions[i]['condition_type_suffix']).prop('checked', false);
		
		$('#txt' + clientConditions[i]['condition_type_suffix']).val(clientConditions[i]['client_condition_remark']);
	}
}

function setEditMode()
{
	$btnUpdateClient.removeClass('hidden');
	$btnCancelEdit.removeClass('hidden');
	$btnEditClient.addClass('hidden');
	//$btnPrintReport.addClass('hidden');
	
	$ddlHealthFund.prop('disabled', '');
	$txtMemNo.prop('readonly', '');
	$txtPatientID.prop('disabled', '');
	$txtFirstName.prop('readonly', '');
	$txtLastName.prop('readonly', '');
	$radMale.prop('disabled', '');
	$radFemale.prop('disabled', '');
	$txtAddress.prop('readonly', '');
	$txtPostcode.prop('readonly', '');
	$txtEmail.prop('readonly', '');
	$txtContactNo.prop('readonly', '');
	$txtBirthday.prop('readonly', '');
	$txtOccupation.prop('readonly', '');
	$txtSports.prop('readonly', '');
	$txtOtherCon.prop('readonly', '');
	$txtEmerConName.prop('readonly', '');
	$txtEmerConNo.prop('readonly', '');
	
	for (var i = 0; i < findingElements.length; i++) {
		$('#cb' + findingElements[i].suffix).prop('disabled', '');
		if ($('#txt' + findingElements[i].suffix).length)
			$('#txt' + findingElements[i].suffix).prop('readonly', '');
	}
	
	for (var i = 0; i < conditionElements.length; i++) {
		$('#cb' + conditionElements[i].suffix).prop('disabled', '');
		if ($('#txt' + conditionElements[i].suffix).length)
			$('#txt' + conditionElements[i].suffix).prop('readonly', '');
	}
	
	main_move_to_title_text();
}

function setViewMode()
{
	$btnEditClient.removeClass('hidden');
	//$btnPrintReport.removeClass('hidden');
	$btnUpdateClient.addClass('hidden');
	$btnCancelEdit.addClass('hidden');
	
	$ddlHealthFund.prop('disabled', 'true');
	$txtMemNo.prop('readonly', 'true');
	$txtPatientID.prop('disabled', 'true');
	$txtFirstName.prop('readonly', 'true');
	$txtLastName.prop('readonly', 'true');
	$radMale.prop('disabled', 'true');
	$radFemale.prop('disabled', 'true');
	$txtAddress.prop('readonly', 'true');
	$txtPostcode.prop('readonly', 'true');
	$txtEmail.prop('readonly', 'true');
	$txtContactNo.prop('readonly', 'true');
	$txtBirthday.prop('readonly', 'true');
	$txtOccupation.prop('readonly', 'true');
	$txtSports.prop('readonly', 'true');
	$txtOtherCon.prop('readonly', 'true');
	$txtEmerConName.prop('readonly', 'true');
	$txtEmerConNo.prop('readonly', 'true');
	
	for (var i = 0; i < findingElements.length; i++) {
		$('#cb' + findingElements[i].suffix).prop('disabled', 'true');
		if ($('#txt' + findingElements[i].suffix).length)
			$('#txt' + findingElements[i].suffix).prop('readonly', 'true');
	}
	
	for (var i = 0; i < conditionElements.length; i++) {
		$('#cb' + conditionElements[i].suffix).prop('disabled', 'true');
		if ($('#txt' + conditionElements[i].suffix).length)
			$('#txt' + conditionElements[i].suffix).prop('readonly', 'true');
	}
}

function updateClient()
{
	editedClientInfo = getEditedClientInfo();
	main_request_ajax('client-boundary.php', 'UPDATE_CLIENT', editedClientInfo, onUpdateClientDone);
}

function onUpdateClientDone(response)
{
	if (response.success) {
		// If updated successful, disable all inputs and update cache [_clientInfo]
		main_info_message(response.msg);
		setViewMode();
		
		_clientInfo = response.result;
	}
	else {
		// If updating client info failed, disable all inputs and reverse inputs' values to origin
		main_alert_message(response.msg);
		cancelEditClient();
	}
}

function cancelEditClient()
{
	setViewMode();
	setClientInfo(_clientInfo);
}

function getEditedClientInfo()
{
	var clientInfo = {
			client_id: _clientID,
			client_membership_no: $txtMemNo.val(),
			client_patient_id: $txtPatientID.val(),
			health_fund_name: $ddlHealthFund.find('option:selected').text(),
			health_fund_id: $ddlHealthFund.val(),
			client_first_name: $txtFirstName.val(),
			client_last_name: $txtLastName.val(),
			client_gender: ($radMale.is(':checked')) ? $radMale.val() : $radFemale.val(),
			client_address: $txtAddress.val(),
			client_postcode: $txtPostcode.val(), 
			client_email: $txtEmail.val(),
			client_contact_no: $txtContactNo.val(),
			client_birthday: $txtBirthday.val(),
			client_occupation: $txtOccupation.val(),
			client_sports: $txtSports.val(),
			client_other_conditions: $txtOtherCon.val(),
			client_emergency_contact_name: $txtEmerConName.val(),
			client_emergency_contact_no: $txtEmerConNo.val(),
			client_findings: getClientFindings(),
			client_conditions: getClientConditions()
	};
	
	return clientInfo;
}

function getClientFindings()
{
	var findings = [];
	
	// ***json does not work with for..in
	//
	for (var i = 0; i < findingElements.length; i++) {
		findings.push({
			finding_type_id: findingElements[i].id,
			finding_type_suffix: findingElements[i].suffix,
			client_finding_checked: $('#cb' + findingElements[i].suffix).is(':checked'),
			client_finding_remark: ($('#txt' + findingElements[i].suffix).length) ? $('#txt' + findingElements[i].suffix).val() : ''
		});
	}
	
	return findings;
}

function getClientConditions()
{
	var conditions = [];
	
	for (var i = 0; i < conditionElements.length; i++) {
		conditions.push({
			condition_type_id: conditionElements[i].id,
			condition_type_suffix: conditionElements[i].suffix,
			client_condition_checked: $('#cb' + conditionElements[i].suffix).is(':checked'),
			client_condition_remark: $('#txt' + conditionElements[i].suffix).val()
		});
	}
	
	return conditions;
}

function validateReportInputs()
{
	if ($txtReportDate.val().length) {
		if ($txtReportDate.inputmask("isComplete")) {
			if ($txtReportDetail.val().trim().length) {
				return true;
				/*
				if ($txtReportRecom.val().trim().length) {
					return true;
				}
				else {
					main_alert_message('Please enter "Report Recommendation"', function(){ $txtReportRecom.focus();});
				}
				*/
			}
			else {
				main_alert_message('Please enter "Report Massage Details"', function(){ $txtReportDetail.focus();});
			}
		}
		else {
			main_alert_message('Please enter a valid "Report Date"', function(){ $txtReportDate.focus();});
		}
	}
	else {
		main_alert_message('Please enter "Report Date"', function(){ $txtReportDate.focus();});
	}
	
	return false;
}

function clearReportInputs()
{
	$txtReportDate.val(main_convert_date_format(new Date()));
	$ddlReportHour.val('60');
	$txtReportDetail.val('');
	$txtReportRecom.val('');
	setSelectpickerValues($ddlMuscle, []);
	$ddlReportTemplate.val(-1);
	setMoneyInputValue($txtReportPrice, 0);
	$inputReportFile.val('');
}

function addReport()
{
	reportInfo = getReportInfo();
	
	const fileInput = $inputReportFile[0];
	const file = fileInput.files[0];
	
	// Original AJAX request without file upload 
	//main_request_ajax('client-boundary.php', 'ADD_CLIENT_REPORT', reportInfo, onAddReportDone);
	
	// In order to upload a file with a request, need to use a different AJAX call 
	main_request_ajax_with_file('client-boundary.php', 'ADD_CLIENT_REPORT_WITH_FILE', reportInfo, file, onAddReportDone);
}

function onAddReportDone(response)
{
	if (response.success) {
		main_info_message(response.msg, getReports);
		clearReportInputs();
	}
	else
		main_alert_message(response.msg);
}

function getReportInfo()
{
	var reportInfo = {
			report_id: '',
			client_id: _clientID,
			provider_id: $ddlReportProvider.val(),
			therapist_id: $ddlReportTherapist.val(),
			report_date: $txtReportDate.val(),
			report_hour: $ddlReportHour.val(),
			report_detail: $txtReportDetail.val(),
			report_recommendation: $txtReportRecom.val(),
			report_muscle_treatment_ids: getSelectpickerValues($ddlMuscle),
			report_template_id: $ddlReportTemplate.val(),
			report_price: getMoneyInputValue($txtReportPrice)
	};
	
	return reportInfo;
}

function getReports()
{
	main_request_ajax('client-boundary.php', 'GET_REPORTS', _clientID, onGetReportsDone);
}

function onGetReportsDone(response)
{
	if (response.success) {
		_reports = response.result;
		$panelReportContainer.empty();
		
		for(var i = 0; i < _reports.length; i++) {
			reportID = _reports[i]['report_id'];
			
			therapistList = _therapistOptions.slice(0); // duplicate the array to a new object
			if (_reports[i]['therapist_active'] == '0') {
				deletedTherapistOption = "<option value='" + _reports[i]['therapist_id'] + "'>" + _reports[i]['therapist_name'] + " (Deleted)</option>";
				therapistList.push(deletedTherapistOption);
			}
			
			providerList = _providerOptions.slice(0); // duplicate the array to a new object
			if (_reports[i]['provider_active'] == '0') {
				deletedProviderOption = "<option value='" + _reports[i]['provider_id'] + "'>" + _reports[i]['provider_name'] + " (Deleted)</option>";
				providerList.push(deletedProviderOption);
			}
			
			muscleList = _muscleOptions.slice(0); // duplicate the array to a new object
			
			templateList = _reportTemplateOptions.slice(0);
			
			var fileLink = '#';
			if (_reports[i]['report_file'] != '') {
				fileLink = _reports[i]['report_file'];
			}
			
			$panelReportContainer.append(panelItemTemplate.format(
					reportID,
					i,
					_reports[i]['report_date'],
					_reports[i]['report_detail'],
					_reports[i]['report_recommendation'],
					_reports[i]['report_create_user'],
					_reports[i]['report_create_datetime'],
					_reports[i]['report_update_user'],
					_reports[i]['report_update_datetime'],
					therapistList,
					providerList,
					muscleList,
					templateList,
					fileLink
				));
			
			initSelectpicker($(prefixItemMuscle + reportID), false, false, "");
			
			setReportItemBtnEdit(reportID);
			setReportItemBtnDelete(reportID);
			setReportItemBtnUpdate(reportID);
			setReportItemBtnCancel(reportID);
			
			setReportItemViewMode(reportID);
			setReportItemProvider(reportID, _reports[i]['provider_id']);
			setReportItemTherapist(reportID, _reports[i]['therapist_id']);
			setReportItemHour(reportID, _reports[i]['report_hour']);
			setReportItemMuscle(reportID, _reports[i]['report_muscle_treatment_ids']);
			
			setReportItemReportTemplate(reportID, _reports[i]['report_template_id']);			
			$(prefixItemReportTemplate + reportID).change(function(){
				const selectedTemplateId = $(this).val();
				const elementID = $(this).attr('id');
				const elementReportId = elementID.replace(prefixItemReportTemplate_NoSelector, '');
				
				if (selectedTemplateId > 0) {
					const selectedTemplate = _reportTemplates.find(x => x.report_template_id == selectedTemplateId);
					prefillEditingReport(elementReportId, selectedTemplate);
				} else {
					prefillEditingReport(elementReportId, null);
				}
			});
			
			initMoneyInput($(prefixItemReportPrice + reportID), 0, 1000.99);
			setReportItemPrice(reportID, _reports[i]['report_price']);
		}
	}
	else {
		//main_alert_message(response.msg);
	}
}

function setReportItemBtnEdit(reportID)
{
	$(prefixBtnEditItem + reportID).click(function(){
		// Don't need to find "report_id" agian because the value of [reportID] is already bound
		//reportItemID = $(this).prop('name');
		setReportItemEditMode(reportID);
	});
}

function setReportItemBtnDelete(reportID)
{
	$(prefixBtnDeleteItem + reportID).click(function(){
		deleteReportItem(reportID);
	});
}

function deleteReportItem(reportID)
{
	main_confirm_message('Do you want to DELETE the report?', function() {
		main_request_ajax('client-boundary.php', 'DELETE_REPORT', {'report_id': reportID}, onDeleteReportItemDone);
	}, function(){}, 1);
}

function onDeleteReportItemDone(response)
{
	if (response.success) {
		main_info_message(response.msg, getReports);
	}
	else
		main_alert_message(response.msg);
}

function setReportItemBtnUpdate(reportID)
{
	$(prefixBtnUpdateItem + reportID).click(function(){
		// It the event bound via funtion then
		// Don't need to find "report_id" agian because the value of [reportID] is already bound
		//reportItemID = $(this).prop('name');
		
		reportItemIndex = $(this).prop('name');
		
		reportItemInfo = {
			report_item_index: reportItemIndex,
			report_id: reportID,
			report_hour: getReportItemHour(reportID),
			report_detail: getReportItemDetail(reportID),
			report_recommendation: getReportItemRecom(reportID),
			therapist_id: getReportItemTherapist(reportID),
			provider_id: getReportItemProvider(reportID),
			report_muscle_treatment_ids: getReportItemMuscle(reportID),
			report_template_id: getReportItemReportTemplate(reportID),
			report_price: getReportItemPrice(reportID)
		};
		
		const fileInput = $(prefixInputItemReportFile + reportID)[0];
		const file = fileInput.files[0];
		
		updateReportItem(reportItemInfo, file);		
		setReportItemViewMode(reportID);
	});
}

function updateReportItem(reportItemInfo, file)
{
	//main_request_ajax('client-boundary.php', 'UPDATE_REPORT', reportItemInfo, onUpdateReportItem);
	main_request_ajax_with_file('client-boundary.php', 'UPDATE_REPORT_WITH_FILE', reportItemInfo, file, onUpdateReportItem);
}

function onUpdateReportItem(response)
{
	reportItemInfo = response.result;
	//console.log('reportItemInfo', reportItemInfo);
	if (response.success) {
		// If succeeded, update nwe values in cache [_report] at specific index
		main_info_message(response.msg);
		
		updatedReportID = reportItemInfo['report_id'];
		updatedReportItemIndex = reportItemInfo['report_item_index'];
		
		_reports[updatedReportItemIndex]['provider_id'] = reportItemInfo['provider_id'];
		_reports[updatedReportItemIndex]['therapist_id'] = reportItemInfo['therapist_id'];
		_reports[updatedReportItemIndex]['report_hour'] = reportItemInfo['report_hour'];
		_reports[updatedReportItemIndex]['report_detail'] = reportItemInfo['report_detail'];
		_reports[updatedReportItemIndex]['report_recommendation'] = reportItemInfo['report_recommendation'];
		_reports[updatedReportItemIndex]['report_muscle_treatment_ids'] = reportItemInfo['report_muscle_treatment_ids'];
		_reports[updatedReportItemIndex]['report_template_id'] = reportItemInfo['report_template_id'];
		_reports[updatedReportItemIndex]['report_price'] = reportItemInfo['report_price'];
		
		const reportFile = reportItemInfo['report_file'];
		if (reportFile != '') {
			_reports[updatedReportItemIndex]['report_file'] = reportFile;
			setReportItemFileLink(updatedReportID, reportFile);
		}
		
		setReportItemUpdateUser(updatedReportID, reportItemInfo['report_update_user']);
		setReportItemUpdateDatetime(updatedReportID, reportItemInfo['report_update_datetime']);
	}
	else {
		// If cannot update, reverse inputs' values to original values
		main_alert_message(response.msg);
		reverseReportItem(reportItemInfo['report_id'], reportItemInfo['report_item_index']);
	}
}

function setReportItemBtnCancel(reportID)
{
	$(prefixBtnCancelItem + reportID).click(function(){
		setReportItemViewMode(reportID);
		
		reportItemIndex = $(this).prop('name');
		reverseReportItem(reportID, reportItemIndex);
	});
}

function setReportItemViewMode(reportID)
{
	$(prefixBtnEditItem + reportID).removeClass('hidden');
	$(prefixBtnDeleteItem + reportID).removeClass('hidden');
	$(prefixBtnUpdateItem + reportID).addClass('hidden');
	$(prefixBtnCancelItem + reportID).addClass('hidden');
	
	$(prefixItemProvider + reportID).prop('disabled', true);
	$(prefixItemTherapist + reportID).prop('disabled', true);
	$(prefixItemHour + reportID).prop('disabled', true);
	$(prefixItemDetail + reportID).prop('readonly', true);
	$(prefixItemRecom + reportID).prop('readonly', true);
	$(prefixItemMuscle + reportID).prop('disabled', true);
	$(prefixItemMuscle + reportID).selectpicker('refresh');
	$(prefixItemReportTemplate + reportID).prop('disabled', true);
	$(prefixItemReportPrice + reportID).prop('readonly', true);
	
	toggleReportItemFileLink(reportID);
	
	$(prefixInputItemReportFile + reportID).addClass('hidden');
	resetReportItemInputFile(reportID);
}

function setReportItemEditMode(reportID)
{
	$(prefixBtnEditItem + reportID).addClass('hidden');
	$(prefixBtnDeleteItem + reportID).addClass('hidden');
	$(prefixBtnUpdateItem + reportID).removeClass('hidden');
	$(prefixBtnCancelItem + reportID).removeClass('hidden');
	
	$(prefixItemProvider + reportID).prop('disabled', '');
	$(prefixItemTherapist + reportID).prop('disabled', '');
	$(prefixItemHour + reportID).prop('disabled', '');
	$(prefixItemDetail + reportID).prop('readonly', '');
	$(prefixItemRecom + reportID).prop('readonly', '');
	$(prefixItemMuscle + reportID).prop('disabled', false);
	$(prefixItemMuscle + reportID).selectpicker('refresh');
	$(prefixItemReportTemplate + reportID).prop('disabled', '');
	$(prefixItemReportPrice + reportID).prop('readonly', '');
	
	const fileLink = $(prefixBtnItemViewReportFile + reportID).attr('href');
	if (fileLink != '#') {
		$(prefixBtnItemViewReportFile + reportID).removeClass('hidden');
	} else {
		$(prefixBtnItemViewReportFile + reportID).addClass('hidden');
	}
	
	toggleReportItemFileLink(reportID);
	
	$(prefixInputItemReportFile + reportID).removeClass('hidden');
	resetReportItemInputFile(reportID);
}

function reverseReportItem(reportID, reportItemIndex)
{
	setReportItemProvider(reportID, _reports[reportItemIndex]['provider_id']);
	setReportItemTherapist(reportID, _reports[reportItemIndex]['therapist_id']);
	setReportItemHour(reportID, _reports[reportItemIndex]['report_hour']);
	setReportItemDetail(reportID, _reports[reportItemIndex]['report_detail']);
	setReportItemRecom(reportID, _reports[reportItemIndex]['report_recommendation']);
	setReportItemMuscle(reportID, _reports[reportItemIndex]['report_muscle_treatment_ids']);
	setReportItemReportTemplate(reportID, _reports[reportItemIndex]['report_template_id']);
	setReportItemPrice(reportID, _reports[reportItemIndex]['report_price']);
	
	$(prefixInputItemReportFile + reportID).addClass('hidden');
	resetReportItemInputFile(reportID);
}

function setReportItemProvider(reportID, providerID)
{
	$(prefixItemProvider + reportID).val(providerID);
}

function getReportItemProvider(reportID)
{
	return $(prefixItemProvider + reportID).val();
}

function setReportItemTherapist(reportID, therapistID)
{
	$(prefixItemTherapist + reportID).val(therapistID);
}

function getReportItemTherapist(reportID)
{
	return $(prefixItemTherapist + reportID).val();
}

function setReportItemHour(reportID, hour)
{
	$(prefixItemHour + reportID).val(hour);
}

function getReportItemHour(reportID)
{
	return $(prefixItemHour + reportID).val();
}

function setReportItemDetail(reportID, detail)
{
	$(prefixItemDetail + reportID).val(detail);
}

function getReportItemDetail(reportID)
{
	return $(prefixItemDetail + reportID).val();
}

function setReportItemRecom(reportID, recom)
{
	$(prefixItemRecom + reportID).val(recom);
}

function getReportItemRecom(reportID)
{
	return $(prefixItemRecom + reportID).val();
}

function setReportItemUpdateUser(reportID, user)
{
	$(prefixItemUpdateUser + reportID).text(user);
}

function setReportItemUpdateDatetime(reportID, datetime)
{
	$(prefixItemUpdateDatetime + reportID).text(datetime);
}

function setReportItemMuscle(reportID, muscleIDs)
{
	setSelectpickerValues($(prefixItemMuscle + reportID), muscleIDs);
}

function getReportItemMuscle(reportID)
{
	return getSelectpickerValues($(prefixItemMuscle + reportID));
}

function setReportItemReportTemplate(reportID, reportTemplateID)
{
	$(prefixItemReportTemplate + reportID).val(reportTemplateID);
}

function getReportItemReportTemplate(reportID)
{
	return $(prefixItemReportTemplate + reportID).val();
}

function setReportItemPrice(reportID, price)
{
	setMoneyInputValue($(prefixItemReportPrice + reportID), price);
}

function getReportItemPrice(reportID)
{
	return getMoneyInputValue($(prefixItemReportPrice + reportID));
}

function toggleReportItemFileLink(reportID) {
	const fileLink = $(prefixBtnItemViewReportFile + reportID).attr('href');
	if (fileLink != '#') {
		$(prefixBtnItemViewReportFile + reportID).removeClass('hidden');
	} else {
		$(prefixBtnItemViewReportFile + reportID).addClass('hidden');
	}
}

function resetReportItemInputFile(reportID)
{
	$(prefixInputItemReportFile + reportID).val('');
}

function setReportItemFileLink(reportID, fileLink)
{
	$(prefixBtnItemViewReportFile + reportID).attr('href', fileLink);
	toggleReportItemFileLink(reportID);
}

function validateReceiptDetails()
{
	if ($txtReceiptDate.inputmask("isComplete") && $txtReceiptDate.val().trim().length) {
		if ($txtReceiptValue.val().trim().replace(/\$/i, '').length > 0) {
			if ($ddlProvider.val() != 'ADD_NEW_PROVIDER') {
				return true;
			} else {
				main_alert_message('Please add a provider!', function() { main_open_child_window('../provider/provider.php', initProviders); });
			}
		}
		else {
			main_alert_message('Please enter "Receipt Value"!', function(){ $txtReceiptValue.focus();});
		}
	}
	else {
		main_alert_message('Please enter "Receipt Date"!', function(){ $txtReceiptDate.focus();});
	}
	
	return false;
}

function initProviders()
{
	main_request_ajax('../provider/provider-boundary.php', 'GET_PROVIDER_DISPLAY', {}, onInitProviders);
}

function onInitProviders(response)
{
	if (response.success) {
		_providerOptions = [];
		providers = response.result;

		$ddlProvider.empty();
		$ddlProvider.unbind('click');
		$ddlReportProvider.empty();
		
		if(providers.length) {
			$.each(providers, function (i, provider){
				// ddl for printing a receipt
				option = "<option value='" + provider['provider_no'] + "'>" + provider['provider_name'] + "</option>";
				$ddlProvider.append(option);
				
				// ddl for recording a massage report
				option = "<option value='" + provider['provider_id'] + "'>" + provider['provider_name_short'] + "</option>";
				_providerOptions.push(option);
				$ddlReportProvider.append(option);
			});
			
			$ddlProvider.append("<optgroup label='--------------------------------------------'></optgroup>");
			$ddlProvider.append("<option value='ADD_NEW_PROVIDER'>&gt;&gt; ADD/EDIT PROVIDER &lt;&lt;</option>");
		} else {
			// If there is no "Provider" in the list, then do so
			$ddlProvider.click(function(){
				main_open_child_window('../provider/provider.php', initProviders);
			});
			$ddlProvider.append("<option value='ADD_NEW_PROVIDER'>ADD PROVIDER</option>");
		}
	}
}

function initMuscles()
{
	main_request_ajax('../client/client-boundary.php', 'GET_MUSCLES', {}, onInitMuscles);
}

function onInitMuscles(response)
{
	if (response.success) {
		_muscleOptions = [];
		_muscleDataList = [];
		const muscles = response.result;
		
		$ddlMuscle.empty();
		$ddlMuscle.unbind('click');
		
		if(muscles.length) {
			_muscleDataList = muscles;
			$.each(muscles, function (i, muscle){
				// ddl for adding report
				//option = "<option value='" + muscle['muscle_id'] + "' data-subtext='" + muscle['muscle_image'] + "'>" + muscle['muscle_region_name'] + ' - ' + muscle['muscle_name'] + "</option>";
				//option = "<option value='" + muscle['muscle_id'] + "' title='" + muscle['muscle_region_name'] + " - " + muscle['muscle_name'] + "' data-content='<div onmouseover=\"onMouseOverMuscleItem(event, " + muscle['muscle_id'] + ")\" onmouseleave=\"onMouseLeaveMuscleItem()\">" + muscle['muscle_region_name'] + " - " + muscle['muscle_name'] + "</div>'></option>";
				option = "<option value='" + muscle['muscle_id'] + "' data-content='<div onmouseover=\"onMouseOverMuscleItem(event, " + muscle['muscle_id'] + ")\" onmouseleave=\"onMouseLeaveMuscleItem()\">" + muscle['muscle_region_name'] + " - " + muscle['muscle_name'] + "</div>'></option>";
				$ddlMuscle.append(option);
				
				// options for editing report
				_muscleOptions.push(option);
			});
			
			initSelectpicker($ddlMuscle, false, false, "");
		}
	}
}

function onMouseOverMuscleItem(event, muscleID) {
	const hoverMuscle = _muscleDataList.find(x => x.muscle_id == muscleID);
	if (hoverMuscle) {
		const imageEle = $('#img-muscle-hover');
		if (imageEle) {
			const fixedHeight = 400;
			const screenHeight = window.screen.availHeight;
			const cursorY = event.clientY;
			
			let imgLeft = event.clientX + 20;
			let imgTop = event.clientY;
			if (imgTop + fixedHeight > screenHeight) imgTop = screenHeight - fixedHeight;
			
			imageEle.attr("src", "../image/muscle/" + hoverMuscle.muscle_image);
			imageEle.css("display", "block");
			imageEle.css("position", "fixed");
			imageEle.css("top", imgTop);
			imageEle.css("left", imgLeft);
			imageEle.css("z-index", "9999");
		}
	}
}

function onMouseLeaveMuscleItem() {
	const imageEle = $('#img-muscle-hover');
	if (imageEle) {
		imageEle.css("display", "none");	
	}
}

function initReportTemplates() {
	main_request_ajax('client-boundary.php', 'GET_REPORT_TEMPLATES', {}, onInitReportTemplatesDone);
}

function onInitReportTemplatesDone(response) {
	if (response.success) {
		$ddlReportTemplate.empty();
		
		_reportTemplates = response.result;		
		_reportTemplateOptions = [];
		
		let defaultOption = "<option value='-1'>--- Select template to prefill details below ---</option>";
		_reportTemplateOptions.push(defaultOption);

		$.each(_reportTemplates, function (i, reportTemplate){
			option = "<option value='" + reportTemplate['report_template_id'] + "'>" + reportTemplate['report_template_name'] + "</option>";			
			_reportTemplateOptions.push(option);
		});
		
		$.each(_reportTemplateOptions, function (i, option){
			$ddlReportTemplate.append(option);
		});
	}
	else {
		//main_alert_message(response.msg);
	}
}

function prefillReport(selectReportTemplate) {
	if (selectReportTemplate) {
		$txtReportDetail.val(selectReportTemplate['report_template_detail']);
		$txtReportRecom.val(selectReportTemplate['report_template_recommendation']);	
		setSelectpickerValues($ddlMuscle, selectReportTemplate['report_template_muscle_treatment_ids']);
	} else {
		$txtReportDetail.val('');
		$txtReportRecom.val('');
		setSelectpickerValues($ddlMuscle, []);
	}
}

function prefillEditingReport(reportID, selectReportTemplate) {
	if (selectReportTemplate) {
		setReportItemDetail(reportID, selectReportTemplate['report_template_detail']);
		setReportItemRecom(reportID, selectReportTemplate['report_template_recommendation']);
		setReportItemMuscle(reportID, selectReportTemplate['report_template_muscle_treatment_ids']);
	} else {
		setReportItemDetail(reportID, '');
		setReportItemRecom(reportID, '');
		setReportItemMuscle(reportID, []);
	}
}

