CREATE TABLE Trail (
    Trail_id int IDENTITY(1,1),
    Trail_name varchar(255) NOT NULL UNIQUE,
    Description varchar(255),
    Length FLOAT(2),
    Time int,
    Level varchar(255),
   
    PRIMARY KEY (Trail_id)
);

CREATE TABLE Photo (
    Photo_id int IDENTITY(1,1),
    Link varchar(255),
   
    PRIMARY KEY (Photo_id)
);

CREATE TABLE Trail_photo (
    Photo_id int,
    Trail_id int,
   
    FOREIGN KEY (Trail_id) REFERENCES Trail(Trail_id),
    FOREIGN KEY (Photo_id) REFERENCES Photo(Photo_id),
);


CREATE TABLE Location (
    Location_id int IDENTITY(1,1),
    Name varchar(255),
    Geo_detail varchar(255),
   
    PRIMARY KEY (Location_id),

);


CREATE TABLE Trail_location_point (
    Trail_id int,
    Location_id int,
    Location_order int,
    
   
   FOREIGN KEY (Trail_id) REFERENCES Trail(Trail_id),
   FOREIGN KEY (Location_id) REFERENCES Location(Location_id)
);

CREATE TABLE User_type (
    Type_id int, 
    Type varchar(255),
    
    PRIMARY KEY (Type_id),
);

CREATE TABLE Trail_user (
    User_id int IDENTITY(1,1),
    Name varchar(255),
    Email varchar(255),
    Password varchar(255),
    Type_id int,
    
    PRIMARY KEY (User_id),
    FOREIGN KEY (Type_id) REFERENCES User_type(Type_id)
);


CREATE TABLE User_own_trail (
    Trail_id int UNIQUE,
    User_id int,

   FOREIGN KEY (Trail_id) REFERENCES Trail(Trail_id),
   FOREIGN KEY (User_id) REFERENCES Trail_user(User_id)
);

CREATE TABLE User_trail_view_record (
    Record_id int IDENTITY(1,1),
    User_id int,
    Trail_id int,

   PRIMARY KEY (Record_id),
   FOREIGN KEY (Trail_id) REFERENCES Trail(Trail_id),
   FOREIGN KEY (User_id) REFERENCES Trail_user(User_id)
);