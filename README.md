# Dynamodb

## Capacity Modes

- Each request consumes **1 RCUs** when being **read with strong consistency**.
- Each request consumes **0.5 RCUs** when being **read with eventual consistency**.
- Each request consumes **2 RCUs** when being **read as part of a transaction**.
- Each request consumes **1 WCUs** when being **written**.
- Each request consumes **2 WCUs** when being **written as part of a transaction**.

## Pricing

 - Write capacity unit (WCU)	$0.00074 per WCU
 - Read capacity unit (RCU)	$0.000148 per RCU

## Calculation

 - Read Price = (RCU's * No. Of. Requests) * RCU Price
 - Write Price = (WCU's * No. Of. Requests) * WCU Price

For Example,
  ```
  Read Price = 0.5 * 1000 * 0.000148 = 0.074
  Write price = 2 * 1000 * 0.00074 = 1.48
  ```
