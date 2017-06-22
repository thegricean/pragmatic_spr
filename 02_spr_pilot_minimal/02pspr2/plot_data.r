library(tidyverse)


# path to file
data <- read_csv("results.csv")

# convert data to tibble
# CHECK LATER: is this needed?
data <- as_tibble(data)

# tell R to treat subject and black_balls as factors 
data$subject <- as.factor(data$subject)
data$black_balls <- as.factor(data$black_balls)


# func that creates a scatter plot
# y-axis: the avg word reading time
# x-axis: the target word (word for colour) reading time
# colour: each colour represents a subject
plot_avg_w_rt_avg_tgw_rt <- function() {
	# add column with the reading time of the whole
	data <- mutate(data, sentence_rt = QUANT + of + the1 + balls +
	are + IN + the2 + picture)

	# add a column with the average reading time of a word
	# CHECK LATER: Should TGW be excluded?
	data <- mutate(data, mean_rt = sentence_rt / 8)

	# plot
	ggplot(data = data,
	mapping = aes(
		x = TGW,
		y = mean_rt,
		colour = subject,
	)) + 
	geom_smooth(se = FALSE, method="lm", size = 0.5) +
	geom_point(alpha = 0.5) +
	labs(
		title = "Avg reading time of a word compared to the reading time of the target word",
		subtitle = "in calculating the avg rt of a word, the rt of the target word is excluded",
		x = "reading time of the target word",
		y = "the avg reading time of a word"
	) + 
	coord_cartesian(ylim = c(0, 1250), xlim = c(0, 1250)) +
	coord_equal()
}

ggsave(
	"plot1.pdf",
	plot_avg_w_rt_avg_tgw_rt()
)


# func that creates a facet grid split by quantifier ~ number of black balls
# x-axis: the reading times of "are:, target_colour, "in", "the", "picture"
# y-axis: the reading times of the words
plot_by_condition <- function() {
	# the second part of the sentence("are TGW in the picture")
	# is gathered in collumn sentence_second_part
	data  <- data%>%gather(are, TGW, IN, the2, picture,
		key="sentence_second_part", value = "second_part_rt")
	# specifies the order of the words (like in the original sentence)
	data$sentence_second_part = factor(data$sentence_second_part, levels = c("are", "TGW", "IN", "the2", "picture"))
	# create a column isTG (is target word)
	data <- mutate(data, isTG = NA)
	# fill isTG with true if the row is related to TGW and false if not
	for (i in 1:length(data$sentence_second_part)) {
		if (data$sentence_second_part[i] == "TGW") {
			data$isTG[i] <- TRUE
		} else {
			data$isTG[i] <- FALSE
		}
	}

	ggplot(
		data = data,
		mapping = aes(
			x = sentence_second_part,
			y = second_part_rt,
			colour = subject,
			shape = isTG,
			size = isTG,
			group = subject)) +
	geom_line(size = 0.3, alpha = 0.7) +
	geom_point() +
	scale_shape_manual(values = c(1, 8)) + 
	scale_size_manual(values = c(0.5, 1)) +
	facet_grid(quantifier ~ black_balls, scales = "free_y", space = "free") +
	labs(
		y = "reading time in ms",
		x = "",
		shape = "is target word",
		size = "is target word"
	) + 
	theme(legend.position = "bottom", axis.text.x=element_text(angle=45,hjust=1,vjust=0.5))
}

ggsave(
	"plot2.pdf",
	plot_by_condition(),
	width = 12,
	height = 5
)

# plot_avg_by_condition <- function() {
# 	# the second part of the sentence("are TGW in the picture")
# 	# is gathered in collumn sentence_second_part
# 	data  <- data%>%gather(are, TGW, IN, the2, picture,
# 		key="sentence_second_part", value = "second_part_rt")

# 	for (i in 1:length.data) {
# 		if (quantifier == "Most" & black_balls == 0)
# 	}
# }

# ggsave(
# 	"plot3.pdf",
# 	plot_avg_by_condition(),
# 	width = 12,
# 	height = 5
# )

# func that creates a scatterplot where the avg reading time per word before the
# target word appears(x axis) is compared to the avg reading time per word after the target word appears (y-axis)
plot_before_after_tgw <- function() {
	# two collumns are added to the data:
	# first - avg reading time of the sentence before seeing the target word (incl. tgw);
	# second - avg reading time of the sentence after seeing the target word (excl. tgw);
	data  <- mutate(data, beforetgw_rt = (QUANT + of + the1 + balls + are) / 5,
		aftertgw_rt = (TGW + IN + the2 + picture) / 4)

	ggplot(
		data = data,
		mapping = aes(
			x = beforetgw_rt,
			y = aftertgw_rt
	)) + 
	geom_point(alpha = 0.6) +
	geom_smooth(se = FALSE, method="lm") +
	coord_equal() + 
	labs(
		title = "The avg reading time of a word before target word appears compared to 
		the avg reading time of a word after target word appears",
		x = "Avg reading time before target word appears",
		y = "Avg reading time after target word appears (incl. targer word rt)"
	)
}

ggsave(
	"plot3.pdf",
	plot_before_after_tgw()
)

# func that creates a histogram
# x-axis: answer
# colour: colour used in the sentence
plot_answer <- function() {
	ggplot(
		data = data,
		mapping = aes(
			x = answer,
			fill = colour
			)) + 
	geom_bar() +
	scale_fill_manual(values = c("black", "white")) +
	facet_grid(quantifier ~ black_balls) +
	labs(
		title = "Answer given by number of black balls and quantifier",
		fill = "colour used",
		x = "answer given"
	) +
	theme_dark() +
	theme(axis.text.x=element_text(angle=45,hjust=1,vjust=0.5))
}

ggsave(
	"plot4.pdf",
	plot_answer()
)

# func that takes data with only "yes" answers
# and plots how many times yes is given per number of black balls displayed
plot_yes <- function() {
	# filters only data with "yes" answer given
	data <- filter(data, answer == "yes")

	ggplot(
		data = data,
		mapping = aes(
			x = black_balls,
	)) +
	geom_bar() +
	facet_grid(colour ~ quantifier) + 
	labs(
		title = "Number of \"yes\" answers given for number of black balls displayed",
		x = "Number of black balls displayed",
		y = "the number of \"yes\" answer given"
	)
}

ggsave(
	"plot5.pdf",
	plot_yes(),
	width = 10,
	height = 5
)