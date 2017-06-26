setwd("~/cogsci/projects/xprag.de/pragmatic_spr/02_spr_pilot_minimal/results/")
library(tidyverse)
library(forcats)
source("rscripts/helpers.R")

d = read.csv("data/results.csv")
summary(d)

unique(d$comments)

dd = d %>% 
  select(-education,-comments,-languages,-gender,-age,-answer_time,-assignment_id) %>%
  gather(Region,RT,-subject,-white_balls,-black_balls, -quantifier,-colour,-answer)
head(dd)

nrow(d)
nrow(dd)

# compute number of balls in the scene that are mentioned in the utterance
dd$CongruentBalls = dd$black_balls
dd[dd$colour == "white",]$CongruentBalls = dd[dd$colour == "white",]$white_balls
# reorder region factor labels by where in the sentence they occur
dd$Region = factor(x=dd$Region,levels=c("QUANT","of","the1","balls","are","TGW","IN","the2","picture"))
# compute what the literally correct answer is
dd$CorrectAnswer = ifelse(dd$quantifier == "All" & dd$colour == "black" & dd$black_balls == 10, "yes", 
                          ifelse(dd$quantifier == "All" & dd$colour == "white" & dd$white_balls == 10, "yes",
                          ifelse(dd$quantifier == "None" & dd$colour == "white" & dd$white_balls == 0, "yes",
                          ifelse(dd$quantifier == "None" & dd$colour == "black" & dd$black_balls == 0, "yes",       
                          ifelse(dd$quantifier == "Most" & dd$colour == "white" & dd$white_balls > 5, "yes",
                          ifelse(dd$quantifier == "Most" & dd$colour == "black" & dd$black_balls > 5, "yes",                                                        ifelse(dd$quantifier == "Some" & dd$colour == "white" & dd$white_balls > 0, "yes",
                          ifelse(dd$quantifier == "Some" & dd$colour == "black" & dd$black_balls > 0, "yes",
                                 "no"))))))))

## PLOTS

# overall RTs
agr = dd %>%
  group_by(Region) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh) #%>%
  # mutate(SentenceRegion=fct_inorder(Region))

ggplot(agr, aes(x=Region,y=Mean,group=1)) +
  geom_point() +
  geom_line() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25)

# overall RTs by correct answer (yes, no)
agr = dd %>%
  group_by(Region,CorrectAnswer) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh) #%>%

ggplot(agr, aes(x=Region,y=Mean,color=CorrectAnswer,group=CorrectAnswer)) +
  geom_point() +
  geom_line() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25)

# overall RTs by correct answer and quantifier
agr = dd %>%
  group_by(Region,CorrectAnswer,quantifier) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh) #%>%

ggplot(agr, aes(x=Region,y=Mean,color=CorrectAnswer,group=CorrectAnswer)) +
  geom_point() +
  geom_line() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~quantifier)

# overall RTs by correct answer and quantifier and # of color-congruent balls
agr = dd %>%
  group_by(Region,CorrectAnswer,quantifier,CongruentBalls) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh)

ggplot(agr, aes(x=Region,y=Mean,color=CorrectAnswer,group=CorrectAnswer)) +
  geom_point() +
  geom_line() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_grid(quantifier~CongruentBalls)

# plot only quantifier and color region
agr = dd %>%
  filter(Region %in% c("QUANT","TGW")) %>%
  group_by(Region,CorrectAnswer,quantifier,CongruentBalls) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh)

ggplot(agr, aes(x=Region,y=Mean,color=CorrectAnswer,group=CorrectAnswer)) +
  geom_point() +
  geom_line() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_grid(quantifier~CongruentBalls)

ggplot(agr, aes(x=CongruentBalls,y=Mean,color=quantifier,group=quantifier)) +
  geom_point() +
  geom_line(size=2) +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~Region) +
  scale_x_continuous(breaks=seq(0,10,by=1))
