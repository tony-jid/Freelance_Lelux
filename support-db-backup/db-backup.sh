today=$(date +"%Y-%m-%d")
file="/home/leluxtha/public_html/support/support-db-backup/lelux-backup-$today.sql"
mysqldump -u leluxtha_sup1 -pleluxsup1 leluxtha_support > "$file"
