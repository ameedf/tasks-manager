CREATE TABLE IF NOT EXISTS `dev_tasks`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(1000) NULL,
  `role` VARCHAR(10) NULL,
  `createdAt` BIGINT(10) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE IF NOT EXISTS `dev_tasks`.`tasks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NOT NULL,
  `userId` INT UNSIGNED NULL,
  `createdAt` BIGINT(10) NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_TASKS_TO_USERS_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `FK_TASKS_TO_USERS`
    FOREIGN KEY (`userId`)
    REFERENCES `dev_tasks`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `dev_tasks`.`users` 
ADD COLUMN `name` VARCHAR(45) NOT NULL AFTER `createdAt`,
ADD UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE;
;

ALTER TABLE `dev_tasks`.`users` 
CHANGE COLUMN `role` `role` VARCHAR(20) NULL DEFAULT NULL ;
