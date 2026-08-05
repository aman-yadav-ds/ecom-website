CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`parent_id` text,
	`description` text,
	`tagline` text,
	`badge` text,
	`highlights` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `dealers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address_line_1` text NOT NULL,
	`address_line_2` text NOT NULL,
	`address_line_3` text NOT NULL,
	`contact_no` text,
	`email` text,
	`map_link` text,
	`coordinates` text NOT NULL,
	`website` text,
	`assortment` text NOT NULL,
	`services` text NOT NULL,
	`is_premium_hub` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news_articles` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`date` text NOT NULL,
	`author` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`related_products` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_articles_slug_unique` ON `news_articles` (`slug`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`cover_image` text NOT NULL,
	`cover_image_alt` text,
	`category_id` text NOT NULL,
	`tags` text NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`default_variant_id` text,
	`maintenance_tips` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `variants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`product_id` text NOT NULL,
	`images` text NOT NULL,
	`images_alt` text,
	`price` text NOT NULL,
	`applicable_gst` text NOT NULL,
	`technical_details` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
