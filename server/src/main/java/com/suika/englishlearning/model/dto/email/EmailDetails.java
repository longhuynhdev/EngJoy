package com.suika.englishlearning.model.dto.email;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailDetails implements Serializable {

    // Email recipient
    private String recipient;

    // Subject of the email
    private String subject;

    // Message body of the email
    private String msgBody;

    // Attachment file path (optional)
    private String attachment;

    // Constructors
    public EmailDetails() {
    }

    public EmailDetails(String recipient, String subject, String msgBody, String attachment) {
        this.recipient = recipient;
        this.subject = subject;
        this.msgBody = msgBody;
        this.attachment = attachment;
    }

    // Getters and Setters
    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    // toString for debugging purposes
    @Override
    public String toString() {
        return "EmailDetails{" +
                "recipient='" + recipient + '\'' +
                ", subject='" + subject + '\'' +
                ", msgBody='" + msgBody + '\'' +
                ", attachment='" + attachment + '\'' +
                '}';
    }
}
