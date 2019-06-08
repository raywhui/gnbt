# GNBT
This is a multifunctional, quality of life discord bot that currently has the following functions:

1. Track packages

## Setup
1. Run `npm install` in your terminal to download all the packages needed for this bot.
2. Create a file `auth.json` and place is at the root of the directory. The file should look like this:
```json
{
  "token": "DISCORD_TOKEN",
  "upsUser": "UPS_USER_EMAIL",
  "upsPass": "UPS_USER_PASSWORD",
  "upsServiceAccessToken": "UPS_SERVICE_ACCESS_TOKEN",
  "fedex": {
    "fedexAuthKey": "FEDEX_AUTH_KEY",
    "fedexPassword": "FEDEX_PASSWORD",
    "fedexAccNum": "FEDEX_ACCOUNT_NUMBER",
    "fedexMeterNumber": "FEDEX_METER_NUMBER",
  }
}
```
3. Run `node init.js` to run the bot on your Discord server.
4. (Add more instructions after we get an actual server up)

## File Structure
```
.
├── apis                            # Functions that hook into API's.
│   ├── consts                      # Templated API queries.
├── commands                        # Discord command files.
│   ├── command                     # Relevant files for single command.
│   │   ├── command.bot.js          # Connects command to bot commands.
│   │   └── command.js              # Returns result of command.
│   ... 
├── cron                            # Files for cron job.
├── bot.js                          # Discord bot related functions.
├── init.js                         # Initializes bot in Discord.
├── auth.json                       # Credentials JSON file.
```

## Future Updates
Planned updates for our bot, broken down into functionality we need immediately and other's that are lower priority.

#### Immediate (For v1.0.0)
- Fedex package tracking 
- USPS package tracking
- Yelp Restaurant Search
- Setup MySQL Server for tracking + logging
- CI/CD (Jenkins, Azure, or GitLab)
#### Later
- Convert to ES6
- Babel
- Move main functions into `/src` folder
- DHL package tracking
- Mass message delete
- Event Calendar
- Bill splitting
- User command tracking (Checks user command, creates pass/fail log)
## Contributors
- raywhui (Lead Developer)
- jktam (Developer)
- alvinwklee (Product Designer that edits readme's)
- heyfdc (commited something)
