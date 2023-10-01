<?php
	require_once '../login/page-authentication.php';
	
	Authentication::permissionCheck(basename($_SERVER['PHP_SELF']));
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	    
	    <title>Client - Report Templates</title>
	    
	    <?php require_once '../master-page/script-main.php';?>
	    <?php require_once '../master-page/script-select.php';?>
	    
	    <script type="text/javascript" src="client-report-template.js?<?php echo time(); ?>"></script>
	    <script type="text/javascript" src="client-variable.js?<?php echo time(); ?>"></script>
	    	    
	    <script type="text/javascript">
	    	$(document).ready(function(){
	    		initPage();
		    });
	    </script>
    </head>
    <body>
    	<?php require_once '../master-page/header.php';?>
    	
    	<?php $_GET['page'] = 'client'; require_once '../master-page/menu.php';?>
    	
    	<div id="content">
			<div class="title-container">
				<div class="title-text">Client Report Template</div>
			</div>
			<div class="container res-gutter">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-xs-4 col-sm-offset-2 col-sm-2 control-label">Template Name</label>
						<div class="col-xs-8 col-sm-6">
							<input type="text" id="txtReportTemplateName" class="form-control">
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-4 col-sm-offset-2 col-sm-2 control-label">Muscle Treatment</label>
						<div class="col-xs-8 col-sm-6">
							<select id="ddlMuscle" class="form-control" multiple>
							</select>
						</div>
						<img id="img-muscle-hover" style="display:none" src="" />
					</div>
					<div class="form-group">
						<label class="col-xs-4 col-sm-offset-2 col-sm-2 control-label">Massage Details</label>
						<div class="col-xs-8 col-sm-6">
							<textarea id="txtReportDetail" rows="6" class="form-control"></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-4 col-sm-offset-2 col-sm-2 control-label">Recommendation</label>
						<div class="col-xs-8 col-sm-6">
							<textarea id="txtReportRecom" rows="3" class="form-control"></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12 text-center">
							<button type="button" id="btnAddReport" class="btn btn-primary btn-lg">
								<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
								Add Template
							</button>
						</div>
					</div>
					<br>
					<div class="form-group">
					
						<!-- Panel Report Container -->
						<div id="panelReportContainer" class="col-sm-offset-2 col-sm-8">
						</div>
					</div>
				</form>
			</div>
		</div>
    	
    	<div id="footer">
		</div> <!-- footer -->
    </body>
</html>