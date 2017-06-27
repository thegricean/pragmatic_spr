setwd("~/cogsci/projects/xprag.de/pragmatic_spr/02_spr_pilot_minimal/results/")
library(tidyverse)
library(forcats)
source("rscripts/helpers.R")

d = read.csv("data/results.csv")
summary(d)
d$CongruentBalls = ifelse(d$colour == "black", d$black_balls, d$white_balls)

# if everthing is encoded correctly, then the following line should yield 1 in each cell (if you have one subject's worth of data)
table(d$CongruentBalls,d$quantifier)