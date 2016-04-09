<?php
	require_once '../controller/DataAccess.php';
	
	class AuthenticationDataMapper
	{
		private $_dataAccess;
	
		public function AuthenticationDataMapper()
		{
			$this->_dataAccess = new DataAccess();
		}
		
		public function verifyUser($loginInfo)
		{
			$sql_format = "select * from therapist where therapist_username = '%s' and therapist_password = '%s'";
				
			$sql = sprintf($sql_format
					, $loginInfo['therapist_username']
					, $loginInfo['therapist_password']);
				
			return $this->_dataAccess->select($sql);
		} // verifyUser
		
		public function changePassword($passwordInfo)
		{
			$sql_format = "
					update therapist
					set therapist_password = '%s'
						, therapist_update_datetime = NOW()
					where therapist_id = '%s'
						and therapist_username = '%s'
						and therapist_password = '%s'";
			
			$sql = sprintf($sql_format
					, $passwordInfo['therapist_new_password']
					, $passwordInfo['therapist_id']
					, $passwordInfo['therapist_username']
					, $passwordInfo['therapist_old_password']);
			
			return $this->_dataAccess->update($sql);
		} // changePassword
	}
?>










