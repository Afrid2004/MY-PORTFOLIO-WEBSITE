const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const contactEmailTemplate = ({
  name,
  email,
  subject,
  message,
  attachmentNames = [],
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Contact Message</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, Helvetica, sans-serif;
    color: #18181b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background-color: #f4f4f5;
      padding: 40px 15px;
    "
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 620px;
            background-color: #ffffff;
            border: 1px solid #e4e4e7;
            border-radius: 14px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #00152e;
                padding: 28px 30px;
              "
            >
              <div
                style="
                  font-size: 11px;
                  font-weight: 700;
                  letter-spacing: 1.6px;
                  text-transform: uppercase;
                  color: #dbff00;
                  margin-bottom: 8px;
                "
              >
                Portfolio Contact
              </div>

              <div
                style="
                  font-size: 24px;
                  font-weight: 700;
                  line-height: 1.3;
                  color: #ffffff;
                "
              >
                New Contact Message
              </div>

              <div
                style="
                  margin-top: 8px;
                  font-size: 13px;
                  line-height: 1.6;
                  color: #cbd5e1;
                "
              >
                Someone has contacted you through your portfolio.
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">

              <!-- Section Title -->
              <div
                style="
                  font-size: 12px;
                  font-weight: 700;
                  color: #71717a;
                  text-transform: uppercase;
                  letter-spacing: 0.8px;
                  margin-bottom: 18px;
                "
              >
                Contact Information
              </div>

              <!-- Name -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-bottom: 13px;"
              >
                <tr>
                  <td
                    width="105"
                    style="
                      font-size: 13px;
                      color: #71717a;
                      vertical-align: top;
                      padding-bottom: 2px;
                    "
                  >
                    Name
                  </td>

                  <td
                    style="
                      font-size: 14px;
                      font-weight: 600;
                      color: #18181b;
                    "
                  >
                    ${safeName}
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-bottom: 13px;"
              >
                <tr>
                  <td
                    width="105"
                    style="
                      font-size: 13px;
                      color: #71717a;
                      vertical-align: top;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      font-size: 14px;
                      color: #18181b;
                    "
                  >
                    <a
                      href="mailto:${safeEmail}"
                      style="
                        color: #2563eb;
                        text-decoration: none;
                      "
                    >
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    width="105"
                    style="
                      font-size: 13px;
                      color: #71717a;
                      vertical-align: top;
                    "
                  >
                    Subject
                  </td>

                  <td
                    style="
                      font-size: 14px;
                      font-weight: 600;
                      color: #18181b;
                    "
                  >
                    ${safeSubject}
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div
                style="
                  height: 1px;
                  background-color: #e4e4e7;
                  margin: 28px 0;
                "
              ></div>

              <!-- Message Title -->
              <div
                style="
                  font-size: 12px;
                  font-weight: 700;
                  color: #71717a;
                  text-transform: uppercase;
                  letter-spacing: 0.8px;
                  margin-bottom: 12px;
                "
              >
                Message
              </div>

              <!-- Message Box -->
              <div
                style="
                  background-color: #f8fafc;
                  border: 1px solid #e4e4e7;
                  border-radius: 10px;
                  padding: 18px;
                  font-size: 14px;
                  line-height: 1.8;
                  color: #3f3f46;
                "
              >
                ${safeMessage}
              </div>

              ${
                attachmentNames.length > 0
                  ? `
              <!-- Attachment -->
              <div
                style="
                  margin-top: 20px;
                  padding: 14px 16px;
                  background-color: #f8fafc;
                  border: 1px solid #e4e4e7;
                  border-radius: 10px;
                "
              >
                <div
                  style="
                    font-size: 11px;
                    font-weight: 700;
                    color: #71717a;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    margin-bottom: 5px;
                  "
                >
                  ${attachmentNames.length === 1 ? "Attachment" : "Attachments"}
                </div>

                <div
                  style="
                    font-size: 14px;
                    font-weight: 600;
                    color: #18181b;
                    word-break: break-word;
                    line-height: 1.7;
                  "
                >
                  ${attachmentNames
                    .map((fileName) => escapeHtml(fileName))
                    .join("<br />")}
                </div>
              </div>
              `
                  : ""
              }

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                background-color: #fafafa;
                border-top: 1px solid #e4e4e7;
                padding: 20px 30px;
                text-align: center;
              "
            >
              <div
                style="
                  font-size: 12px;
                  color: #a1a1aa;
                  line-height: 1.6;
                "
              >
                This message was sent from your portfolio
                contact form.
              </div>

              <div
                style="
                  margin-top: 5px;
                  font-size: 12px;
                  color: #a1a1aa;
                "
              >
                faisalfreelancer.com
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
