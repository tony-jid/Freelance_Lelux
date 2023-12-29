var _reports;
var _muscleOptions;
var _muscleDataList;

var $btnAddReport;

var $txtReportTemplateName, $txtReportDetail, $txtReportRecom, $ddlMuscle;
var $panelReportContainer;
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

var panelItemTemplate = "<div id=\"panelItem{0}\" class=\"panel panel-warning\"><div class=\"panel-heading\"><div class=\"row\"><div class=\"col-sm-6\"><div class=\"panel-title\"><b>Template name: </b><span id=\"lblTemplateName{0}\">{2}</span></div></div><div class=\"col-sm-6 text-right\"><button type=\"button\" id=\"btnEditItem{0}\" class=\"btn btn-info btn-xs btn-inline\" name=\"{0}\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"/> Edit</button><button type=\"button\" id=\"btnDeleteItem{0}\" class=\"btn btn-danger btn-xs btn-inline\" name=\"{0}\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"/>Delete</button><button type=\"button\" id=\"btnUpdateItem{0}\" class=\"btn btn-warning btn-xs btn-inline\" name=\"{1}\"><span class=\"glyphicon glyphicon-floppy-save\" aria-hidden=\"true\"/> Update</button><button type=\"button\" id=\"btnCancelItem{0}\" class=\"btn btn-default btn-xs btn-inline\" name=\"{1}\">Cancel</button></div></div></div><div class=\"panel-body\"><div class=\"form-group\"><label class=\"col-xs-4 col-sm-3 control-label\">Muscle Treatment</label><div class=\"col-xs-8 col-sm-9\"><select id=\"ddlItemMuscle{0}\" class=\"form-control\" multiple disabled>{9}</select></div></div><div class=\"form-group\"><label class=\"col-xs-4 col-sm-3 control-label\">Massage Details</label><div class=\"col-xs-8 col-sm-9\"><textarea id=\"txtItemDetail{0}\" rows=\"6\" class=\"form-control\" readonly>{3}</textarea></div></div><div class=\"form-group\"><label class=\"col-xs-4 col-sm-3 control-label\">Recommendations</label><div class=\"col-xs-8 col-sm-9\"><textarea id=\"txtItemRecom{0}\" rows=\"3\" class=\"form-control\" readonly>{4}</textarea></div></div></div><div class=\"panel-footer\"><small><b>Created by: </b><span id=\"lblItemCreateUser{0}\">{5}</span><b> Created on: </b><span id=\"lblItemCreateDatetime{0}\">{6}</span><b> Updated by: </b><span id=\"lblItemUpdateUser{0}\">{7}</span><b> Updated on: </b><span id=\"lblItemUpdateDatetime{0}\">{8}</span></small></div></div>";	

function initPage()
{
	main_ajax_success_hide_loading();
	
	initElementVariables();
	
	$btnAddReport = $('#btnAddReport');	
	$panelReportContainer = $('#panelReportContainer');
	$txtReportTemplateName = $('#txtReportTemplateName');	
	$txtReportDetail = $('#txtReportDetail');
	$txtReportRecom = $('#txtReportRecom');
	$ddlMuscle = $('#ddlMuscle');
	
	initMuscles();
	
	$btnAddReport.click(function(){
		if (validateReportInputs())
			main_confirm_message('Do you want to add a report template?', addReportTemplate, function(){ $btnAddReport.focus(); });
	});
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
				option = "<option value='" + muscle['muscle_id'] + "' data-content='<div onmouseover=\"onMouseOverMuscleItem(event, " + muscle['muscle_id'] + ")\" onmouseleave=\"onMouseLeaveMuscleItem()\">" + muscle['muscle_region_name'] + " - " + muscle['muscle_name'] + "</div>'></option>";
				$ddlMuscle.append(option);
				
				// options for editing report
				_muscleOptions.push(option);
			});
			
			initSelectpicker($ddlMuscle, false, false, "");
		}
		
		getReportTemplates();
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

function validateReportInputs()
{
	if ($txtReportTemplateName.val().trim().length) {
		if ($txtReportDetail.val().trim().length) {
			if ($txtReportRecom.val().trim().length) {
				return true;
			}
			else {
				main_alert_message('Please enter "Template Recommendation"', function(){ $txtReportRecom.focus();});
			}
		}
		else {
			main_alert_message('Please enter "Template Details"', function(){ $txtReportDetail.focus();});
		}	
	} else {
		main_alert_message('Please enter "Template Name"', function(){ $txtReportTemplateName.focus();});
	}
	
	return false;
}

function clearReportInputs()
{
	$txtReportTemplateName.val('');
	$txtReportDetail.val('');
	$txtReportRecom.val('');
	setSelectpickerValues($ddlMuscle, []);
}

function addReportTemplate()
{
	reportInfo = getReportTemplateInfo();
	console.log("reportInfo", reportInfo);
	main_request_ajax('client-boundary.php', 'ADD_CLIENT_REPORT_TEMPLATE', reportInfo, onAddReportDone);
}

function onAddReportDone(response)
{
	if (response.success) {
		main_info_message(response.msg, getReportTemplates);
		clearReportInputs();
	}
	else
		main_alert_message(response.msg);
}

function getReportTemplateInfo()
{
	var reportInfo = {
			report_template_id: 0,
			report_template_name: $txtReportTemplateName.val(),
			report_template_detail: $txtReportDetail.val(),
			report_template_recommendation: $txtReportRecom.val(),
			report_template_muscle_treatment_ids: getSelectpickerValues($ddlMuscle)
	};
	
	return reportInfo;
}

function getReportTemplates()
{
	main_request_ajax('client-boundary.php', 'GET_REPORT_TEMPLATES', {}, onGetReportTemplatesDone);
}

function onGetReportTemplatesDone(response)
{
	if (response.success) {
		_reports = response.result;
		$panelReportContainer.empty();
		
		for(var i = 0; i < _reports.length; i++) {
			reportID = _reports[i]['report_template_id'];
			
			muscleList = _muscleOptions.slice(0); // duplicate the array to a new object
			
			$panelReportContainer.append(panelItemTemplate.format(
					reportID,
					i,
					_reports[i]['report_template_name'],
					_reports[i]['report_template_detail'],
					_reports[i]['report_template_recommendation'],
					_reports[i]['report_template_create_user'],
					_reports[i]['report_template_create_datetime'],
					_reports[i]['report_template_update_user'],
					_reports[i]['report_template_update_datetime'],
					muscleList
				));
			
			initSelectpicker($(prefixItemMuscle + reportID), false, false, "");
			
			setReportItemBtnEdit(reportID);
			setReportItemBtnDelete(reportID);
			setReportItemBtnUpdate(reportID);
			setReportItemBtnCancel(reportID);
			
			setReportItemViewMode(reportID);			
			setReportItemMuscle(reportID, _reports[i]['report_template_muscle_treatment_ids']);
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
	main_confirm_message('Do you want to DELETE the report template?', function() {
		main_request_ajax('client-boundary.php', 'DELETE_REPORT_TEMPLATE', {'report_template_id': reportID}, onDeleteReportItemDone);
	}, function(){}, 1);
}

function onDeleteReportItemDone(response)
{
	if (response.success) {
		main_info_message(response.msg, getReportTemplates);
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
		setReportItemViewMode(reportID);
		
		reportItemIndex = $(this).prop('name');
		
		reportItemInfo = {
			report_item_index: reportItemIndex,
			report_template_id: reportID,
			report_template_detail: getReportItemDetail(reportID),
			report_template_recommendation: getReportItemRecom(reportID),
			report_template_muscle_treatment_ids: getReportItemMuscle(reportID)
		};
		
		updateReportItem(reportItemInfo);
	});
}

function updateReportItem(reportItemInfo)
{
	main_request_ajax('client-boundary.php', 'UPDATE_REPORT_TEMPLATE', reportItemInfo, onUpdateReportItem);
}

function onUpdateReportItem(response)
{
	reportItemInfo = response.result;
	console.log('reportItemInfo', reportItemInfo);
	if (response.success) {
		// If succeeded, update nwe values in cache [_report] at specific index
		main_info_message(response.msg);
		
		updatedReportID = reportItemInfo['report_template_id'];
		updatedReportItemIndex = reportItemInfo['report_item_index'];
		
		_reports[updatedReportItemIndex]['report_template_detail'] = reportItemInfo['report_template_detail'];
		_reports[updatedReportItemIndex]['report_template_recommendation'] = reportItemInfo['report_template_recommendation'];
		_reports[updatedReportItemIndex]['report_template_muscle_treatment_ids'] = reportItemInfo['report_template_muscle_treatment_ids'];
		
		setReportItemUpdateUser(updatedReportID, reportItemInfo['report_template_update_user']);
		setReportItemUpdateDatetime(updatedReportID, reportItemInfo['report_template_update_datetime']);
	}
	else {
		// If cannot update, reverse inputs' values to original values
		main_alert_message(response.msg);
		reverseReportItem(reportItemInfo['report_template_id'], reportItemInfo['report_item_index']);
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
	
	$(prefixItemDetail + reportID).prop('readonly', true);
	$(prefixItemRecom + reportID).prop('readonly', true);
	$(prefixItemMuscle + reportID).prop('disabled', true);
	$(prefixItemMuscle + reportID).selectpicker('refresh');
}

function setReportItemEditMode(reportID)
{
	$(prefixBtnEditItem + reportID).addClass('hidden');
	$(prefixBtnDeleteItem + reportID).addClass('hidden');
	$(prefixBtnUpdateItem + reportID).removeClass('hidden');
	$(prefixBtnCancelItem + reportID).removeClass('hidden');
	
	$(prefixItemDetail + reportID).prop('readonly', '');
	$(prefixItemRecom + reportID).prop('readonly', '');
	$(prefixItemMuscle + reportID).prop('disabled', false);
	$(prefixItemMuscle + reportID).selectpicker('refresh');
}

function reverseReportItem(reportID, reportItemIndex)
{
	setReportItemDetail(reportID, _reports[reportItemIndex]['report_template_detail']);
	setReportItemRecom(reportID, _reports[reportItemIndex]['report_template_recommendation']);
	setReportItemMuscle(reportID, _reports[reportItemIndex]['report_template_muscle_treatment_ids']);
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


