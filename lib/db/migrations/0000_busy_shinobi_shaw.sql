CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`email` text,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`last_login` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_username_unique` ON `admin_users` (`username`);--> statement-breakpoint
CREATE TABLE `loan_programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`short_description` text NOT NULL,
	`full_description` text NOT NULL,
	`icon` text NOT NULL,
	`min_down_payment` text,
	`max_loan_amount` text,
	`features` text NOT NULL,
	`requirements` text,
	`benefits` text,
	`is_active` integer DEFAULT 1 NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `loan_programs_slug_unique` ON `loan_programs` (`slug`);--> statement-breakpoint
CREATE TABLE `properties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text DEFAULT 'CA' NOT NULL,
	`zip_code` text NOT NULL,
	`price` real NOT NULL,
	`beds` integer NOT NULL,
	`baths` real NOT NULL,
	`sqft` integer NOT NULL,
	`lot_size` text,
	`year_built` integer,
	`property_type` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`description` text,
	`features` text,
	`images` text NOT NULL,
	`main_image` text NOT NULL,
	`mls_number` text,
	`virtual_tour_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `properties_slug_unique` ON `properties` (`slug`);