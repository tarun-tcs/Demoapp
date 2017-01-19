This is a sample application that depicts two functionalities.

1)  The user can upload the file and save it at the server using this
    functionality.(Currently files are saved in uploads folder in the
    filesystem) User can upload multiple files as well. If same file is
    uploaded again -- this functionality is not yet handled.

2)  The user can generate accessibility report for a website. User must
    upload sitemap.xml(currently written for attached sitemap.xml only)
    Once the file is present in uploads folder user can click on
    generate report button on UI. A report is generated in the download
    folder in csv format. Code for crawling the sitemap is written in
    accessibility.js Pa11y is a node module utilized for generating this
    code.

Note: This is a demo application , it is tried best to catch errors but
not all scenarios are covered.

To run the project you must have nodejs installed Run npm install Run
node app.js Application served at localhost:3000
