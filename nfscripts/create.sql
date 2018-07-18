
drop table if exists user;
create table user (
	id integer primary key autoincrement,
	winName text not null unique,
	dispName text not null unique
);

insert into user (winName, dispName)
values
	('bilbob', 'Bilbo Baggins'),
	('samg', 'Samwise Gamgee'),
	('morgothb', 'Morgoth Bauglir'),
	('tomb', 'Tom Bombadil');

drop table if exists tstatus;
create table tstatus (
	id integer primary key autoincrement,
	stat text not null unique,
	descr text not null
);

insert into tstatus (stat, descr)
values
	('New', 'Enquiry logged by reception but not yet viewed by fee earner'),
	('Pending Quote', 'Viewed by fee earner but not yet quoted'),
	('Closed - Not Quoted', 'Enquiry closed without quote being sent'),
	('Quoted', 'Quote sent to client, awaiting response'),
	('Closed - Accepted', 'New business started'),
	('Closed - Not Accepted', 'Client refused quote or never replied');

drop table if exists enquiry;
create table enquiry (
	id integer primary key autoincrement,
	theCaller text not null,
	whoFor_id integer not null,
	phone text,
	details text,
	actionTaken text,
	remarks text,
	tstatus_id integer not null default 1,
	dateCreated timestamp default current_timestamp,
	dateUpdated timestamp default current_timestamp,
	updatedBy text,
	foreign key (whoFor_id) references user
		on delete cascade on update cascade,
	foreign key (tstatus_id) references tstatus
		on delete cascade on update cascade
);

insert into enquiry (theCaller, whoFor_id, tstatus_id)
values
	('Alpha', 1, 1),
	('Beta', 1, 2),
	('Gamma', 1, 3),
	('Delta', 1, 4),
	('Epsilon', 1, 5),
	('Zeta', 1, 6),
	('Boff', 2, 1),
	('Groff', 2, 1),
	('Hans Gross', 2, 2),
	('Trans Gross', 2, 2),
	('Market', 2, 3),
	('Garden', 2, 4),
	('Bagration', 2, 5),
	('Plunder', 2, 6);

drop view if exists v_enquiry;
create view v_enquiry
as
select *
from enquiry inner join user on enquiry.whoFor_id = user.id
             inner join tstatus on enquiry.tstatus_id = tstatus.id;