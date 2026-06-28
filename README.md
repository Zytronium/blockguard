# BlockGuard

BlockGuard is a community-maintained database of reported suspicious/bot Minecraft accounts to help server owners keep 
their server safe.

---

## Report Categories and Subcategories
Reports are a trust-based system and expect users to use their best judgment in order to report the category they think 
the entity they are reporting is in.

Categories & subcategories include:
- Bot
  - scanner
  - potentially malicious
  - other/unknown
- Hacker
  - malicious hacker
  - ethical hacker
  - other/unknown
- Malicious Player
  - griefer
  - troller
  - other/unknown
- Unknown

## Report form fields
- Category*
- Subcategory*
- Account Username*
- IP Address(es) (maybe required? Not all servers log IPs)
- Did the entity cause any harm on your server?*
- Threat Level (optional)
- Additional Comments (optional)

Reports also save the reporter's IP address (for rate limiting) and time of report.
One report per entity per IP address per week (meaning you can't make the same report twice in a week without multiple 
devices or a VPN)

## Displaying Reports
Firstly, IP addresses will be hidden until the user agrees to ToS (which will primarily state that users cannot use listed
IPs for any illegal or malicious purposes and that IPs shown will only be used for defensive and informational purposes)

Reports will be displayed in a list on the home page if they have enough reports. This list will display the following
for each entity:
- Username
- Most reported category and subcategory
- Number of reports
- Last reported time

Click on a report to also show:
- Associated IP address(es) (if user agrees to ToS)
- Comments on this entity
- Pie chart of reported categories and subcategories
- Command to run to block the entity from your server
- Takedown request form

Users will also be able to search for entities by username or IP address, as well as filter reports by category and 
subcategory.

Entities will only show up on the watch list if they have been reported more than 3 times in the last 90 days. This
will change to 5+ times in the last 30 days if this website gets decent traffic.
