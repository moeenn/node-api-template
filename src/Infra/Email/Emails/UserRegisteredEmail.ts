import { Email } from "@/Infra/Email"
import { AppConfig } from "@/Application/Config"

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div>
    <p>Your account has been successfully created on <a href="<%- frontend_url %>"><%- website_name %></a>. You can login using the following credentials</p>
    <p>Email: <%- user_email %></p>
    <p>Password: <%- user_password %></p>
  </div>
</body>
</html>
`

/**
 *  new users are added to the system by admin or institute
 *  when they are added, we generate a random password for their account
 *  and email it to them
 */
export class UserRegisteredEmail extends Email {
  constructor(userEmail: string, password: string) {
    super("Account Created", template, {
      frontend_url: AppConfig.frontend_url,
      user_email: userEmail,
      user_password: password,
    })
  }
}
