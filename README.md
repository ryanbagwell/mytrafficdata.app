# About this project

This goal of this project is to create a low-cost traffic data collection device that can be deployed by community members looking to quantify vehicle speed and volume data on thier streets.

Professional traffic counting devices usually cost thousands of dollars and must be deployed in travel lanes (i.e. road tubes) or mounted on utility poles, normally requiring the permission of municipal officials.

## How does it work?

The system uses the{" "} [Omni Presense OPS241-A radar device (\$169)](https://omnipresense.com/product/ops241-a-short-range-radar-sensor/) to report the speeds of passing vehicles. [Software](https://github.com/ryanbagwell/lidar-speed-camera) running on a Raspberry PI device connected to the radar device crunches the raw data and sends it to the cloud for further analysis.

## How accurate is this system?

The device appears to report vehicle speeds accurately (within 1 mph of the vehicle's spedeometer) as measured by my personal vehicle's speed. The accuracy of vehicle counts, however, can only be measured against the results of other traffic data collection devices (i.e. road-tube systems, video or radar). Each type of device has its own limitations and margin of error, and no two devices will report the same results over the same period of time.

I've noticed that the device seems to miss some cars when there are several following close to each other at higher speeds. I haven't noticed this happening at lower speeds. A device with a narrower beam width might be able improve the count accuracy.

With that said, the device appears to be counting cars with a meaningful degree of accuracy. At the time of this writing, the device is reporting approximately 7,000 vehicles per day inbound on my street. That's comparable traffic data collected on my street in 2018 about 1/4 of a mile away with a road-tube device.

## Limitations

The system currently has the following limitations:

- **No vehicle classifications** like professional devices, which are normally able to determine the type of vehicle as specified by the{" "} [FHWA](https://www.fhwa.dot.gov/policyinformation/tmguide/tmg_2013/vehicle-types.cfm) .
- **Only inbound vehicles are measured**. Two-way traffic can be counted but it's unclear if outbound vehicles can be counted with any degree of accuracy.
- **The device has a limited range** which means it must be mounted and powered close to the road.

## So what is this good for?

The device is unseful for identifying trends and patterns regarding vehicle volume and speed on local roads. That data can be used by community members and local officials to address traffic complaints.

Since the device counts vehicles continuously, it can also be used to instantly report the results of any mitigation strageties on local roads, like increased speed enforcement or other traffic calming infrastructure.
