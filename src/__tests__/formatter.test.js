import { format } from "../formatter";
import { isTSAnyKeyword } from "@babel/types";

describe("Formatter", () => {
  it("correctly formats the input", () => {
    const input = `FRIDAY 9TH AUGUST
Liverpool
20:00
Norwich City
SATURDAY 10TH AUGUST
West Ham United
12:30
Manchester City
AFC Bournemouth
15:00
Sheffield United
Burnley
15:00
Southampton
Crystal Palace
15:00
Everton
Watford
15:00
Brighton & Hove Albion
Tottenham Hotspur
17:30
Aston Villa
SUNDAY 11TH AUGUST
Leicester City
14:00
Wolverhampton Wanderers
Newcastle United
14:00
Arsenal
Manchester United
16:30
Chelsea
SATURDAY 17TH AUGUST
Arsenal
15:00
Burnley
Aston Villa
15:00
AFC Bournemouth
Brighton & Hove Albion
15:00
West Ham United
Chelsea
15:00
Leicester City
Everton
15:00
Watford
Manchester City
15:00
Tottenham Hotspur
Norwich City
15:00
Newcastle United
Sheffield United
15:00
Crystal Palace
Southampton
15:00
Liverpool
Wolverhampton Wanderers
15:00
Manchester United
SATURDAY 24TH AUGUST
Aston Villa
15:00
Everton
AFC Bournemouth
15:00
Manchester City
Brighton & Hove Albion
15:00
Southampton
Liverpool
15:00
Arsenal
Manchester United
15:00
Crystal Palace
Norwich City
15:00
Chelsea
Sheffield United
15:00
Leicester City
Tottenham Hotspur
15:00
Newcastle United
Watford
15:00
West Ham United
Wolverhampton Wanderers
15:00
Burnley
SATURDAY 31ST AUGUST
Arsenal
15:00
Tottenham Hotspur
Burnley
15:00
Liverpool
Chelsea
15:00
Sheffield United
Crystal Palace
15:00
Aston Villa
Everton
15:00
Wolverhampton Wanderers
Leicester City
15:00
AFC Bournemouth
Manchester City
15:00
Brighton & Hove Albion
Newcastle United
15:00
Watford
Southampton
15:00
Manchester United
West Ham United
15:00
Norwich City`;

    const expected = `09/08/2019
Liverpool v Norwich City

10/08/2019
West Ham United v Manchester City
AFC Bournemouth v Sheffield United
Burnley v Southampton
Crystal Palace v Everton
Watford v Brighton & Hove Albion
Tottenham Hotspur v Aston Villa

11/08/2019
Leicester City v Wolverhampton Wanderers
Newcastle United v Arsenal
Manchester United v Chelsea

17/08/2019
Arsenal v Burnley
Aston Villa v AFC Bournemouth
Brighton & Hove Albion v West Ham United
Chelsea v Leicester City
Everton v Watford
Manchester City v Tottenham Hotspur
Norwich City v Newcastle United
Sheffield United v Crystal Palace
Southampton v Liverpool
Wolverhampton Wanderers v Manchester United

24/08/2019
Aston Villa v Everton
AFC Bournemouth v Manchester City
Brighton & Hove Albion v Southampton
Liverpool v Arsenal
Manchester United v Crystal Palace
Norwich City v Chelsea
Sheffield United v Leicester City
Tottenham Hotspur v Newcastle United
Watford v West Ham United
Wolverhampton Wanderers v Burnley

31/08/2019
Arsenal v Tottenham Hotspur
Burnley v Liverpool
Chelsea v Sheffield United
Crystal Palace v Aston Villa
Everton v Wolverhampton Wanderers
Leicester City v AFC Bournemouth
Manchester City v Brighton & Hove Albion
Newcastle United v Watford
Southampton v Manchester United
West Ham United v Norwich City
`;

    expect(format(input)).toEqual(expected);
  });
});
