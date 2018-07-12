
drop table if exists genre;

create table genre (
	id integer primary key,
	name text not null unique
);

insert into genre (id, name)
values
	(1, 'Tragedy'),
	(2, 'Comedy');

drop table if exists cohen;

create table cohen (
	id integer primary key autoincrement,
	name text not null unique,
	genre_id integer not null,
	year integer not null,
	foreign key (genre_id) references genre (id)
		on delete cascade on update cascade
);

insert into cohen (name, genre_id, year)
values
	('Blood Simple', 1, 1984),
	('Raising Arizona', 2, 1987),
	('Miller''s Crossing', 1, 1990),
	('Barton Fink', 1, 1991),
	('The Hudsucker Proxy', 2, 1994),
	('Fargo', 1, 1996),
	('The Big Lebowski', 2, 1998),
	('O Brother Where Art Thou', 2, 2000),
	('The Man Who Wasn''t There', 1, 2001);

