// ==UserScript==
// @name         Gmail web shorcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       nchicong41@gmail.com
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

/*
Open oldest unread email, from thread list - Alt + 1
In opened mail, quick click to Confluence, Jira URL of that mail - Alt + 2
Show newly received mails in currently reading thread - Alt + 3

// Manually set in https://mail.google.com/mail/u/0/#settings/shortcuts
In currently reading thread, go to next mail - q
In currently reading thread, go to previous mail - w
Go back to thread list - e
Go to next mail after scrolling to the end of the content - Space
*/

(function() {
    window.addEventListener('keydown', function(e) {
        /*
        if (e.keyCode == "27") { //Escape, but does not work as escape is special character. Just use default 'u' for now
            document.querySelector('[href="#inbox"]').click();
        }
        */

        if (e.keyCode == 32) { //Space
            if(!!document.querySelector('[data-tooltip="More send options"]')) {
                return;
            }
            var mailContentBox = document.querySelector('[id=":3"]');
            var a = mailContentBox.scrollTop;
            var b = mailContentBox.scrollHeight - mailContentBox.clientHeight;
            var c = a / b;

            if (c >= 0.8 || b == 0) {
                var newerBtn = document.querySelector('[aria-label="Newer"]');
                newerBtn.click();
            }
        }


        if (e.altKey) {
            if (e.keyCode <= 57 && e.keyCode >= 48) {
                e.preventDefault();
            }

            if (e.keyCode == 49) { // Alt + 1 - Last unread email
                var unreadMails = document.querySelectorAll('[jsname="xSLh2d"] .zE'); //jsname="xSLh2d is Custom Inbox section
                var lastUnreadMail = unreadMails[unreadMails.length - 1];
                var isInboxList = true;
                var gmailIcon = document.querySelector('a[href="#inbox"]');

                if (document.getElementById(":2m") || (document.getElementById(":2m") && document.getElementById(":2m").offsetParent === null)) {
                    isInboxList = false;
                }

                //            if (unreadMails.length == 0 || (!isInboxList && unreadMails.length <= 1)) {
                if (unreadMails.length == 0) {
                    var unreadUnsortedEmails = document.querySelectorAll('div.Cp tr.zE.btb');
                    if (unreadUnsortedEmails.length > 0) {
                        unreadUnsortedEmails[unreadUnsortedEmails.length - 1].click();
                    } else {
                        gmailIcon.click();
                    }
                } else {
                    lastUnreadMail.classList.remove("zE");
                    lastUnreadMail.click();
                }
            }

            if (e.code == "Digit4") { // Alt + 4 - First unread email #todo: clean up
                var unreadMails = document.querySelectorAll('[jsname="xSLh2d"] .zE'); //jsname="xSLh2d is Custom Inbox section
                var lastUnreadMail = unreadMails[unreadMails.length - 1];
                var isInboxList = true;
                var gmailIcon = document.querySelector('a[href="#inbox"]');

                if (document.getElementById(":2m") || (document.getElementById(":2m") && document.getElementById(":2m").offsetParent === null)) {
                    isInboxList = false;
                }

                if (unreadMails.length == 0) {
                    var unreadUnsortedEmails = document.querySelectorAll('div.Cp tr.zE.btb');
                    if (unreadUnsortedEmails.length > 0) {
                        unreadUnsortedEmails[unreadUnsortedEmails.length - 1].click();
                    } else {
                        gmailIcon.click();
                    }
                } else {
                    unreadMails[0].classList.remove("zE");
                    unreadMails[0].click();
                }
            }

            if (e.altKey && e.keyCode == 50) { // Alt + 2
                let jiraMailPrimaryButton = document.querySelector('a[class$="-button__appearance-primary"]');
                let replyButton = document.querySelector('a[title="Reply"]');
                let openGDocsBtn = document.querySelector("a[href^='https://docs.google.com/'][data-saferedirecturl]");
                let jiraServiceDeskViewReqBtn = document.querySelector("a[data-saferedirecturl]");

                if (!!jiraMailPrimaryButton) {
                    jiraMailPrimaryButton.click();
                } else if (!!replyButton) {
                    replyButton.click();
                } else if (!!openGDocsBtn) {
                    openGDocsBtn.click();
                } else if (!!jiraServiceDeskViewReqBtn) {
                    jiraServiceDeskViewReqBtn.click();
                }
            }

            if (e.altKey && e.code == "Digit3") { // show more
                let showButton = document.querySelector(".ata-asE .ata-asJ");
                if (showButton) {
                    showButton.click();
                }
            }

            if (e.key == "q" || (e.altKey && e.keyCode == 49) || e.altKey && e.code == "Digit4") {
                setTimeout(function() {
                    let firstMailItem = document.querySelector(".a3s.aiL");

                    if (!!firstMailItem) {
                        firstMailItem.scrollIntoView();
                    }
                }, 100);
            }
        }
    })
})();