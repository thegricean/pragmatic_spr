setwd("~/cogsci/projects/xprag.de/pragmatic_spr/02_spr_pilot_minimal/results/")
library(tidyverse)
library(forcats)
source("rscripts/helpers.R")

#d = read.csv("data/results.csv")
d = read.csv("data/results2.csv")
summary(d)
d$CongruentBalls = ifelse(d$colour == "black", d$black_balls, d$white_balls)

table(d$CongruentBalls,d$quantifier)

unique(d$comments)

dd = d %>% 
  select(-education,-comments,-languages,-gender,-age,-answer_time,-assignment_id) %>%
  gather(Region,RT,-subject,-white_balls,-black_balls, -quantifier,-colour,-answer,-CongruentBalls)
head(dd)

nrow(d)
nrow(dd)

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


# judgments
nrow(dd)
resptype = dd %>% 
  filter(CongruentBalls == 10 & quantifier == "Some") 
rtype = as.data.frame(table(resptype$subject,resptype$answer))
rtype # looks like in this task people are completely consistent in giving pragmatic or semantic responses
rtype = rtype[rtype$Var2 == "no" & rtype$Freq > 0,]
preponders = rtype$Var1
#print(paste("pragmatic responders: ",preponders))
dd$ResponderType = as.factor(ifelse(dd$subject %in% preponders, "pragmatic","semantic"))
print(prop.table(table(dd$ResponderType)))

# exclude data points where incorrect answer was given (but not where people responded pragmatically to "some" (>5) or "most" (==10))
dd$CorrectAnswerGiven = ifelse(dd$answer == dd$CorrectAnswer, "correct/semantic","incorrect/pragmatic")
table(dd$CorrectAnswerGiven,dd$quantifier)
table(dd$CorrectAnswerGiven,dd$CongruentBalls)
table(dd$CorrectAnswerGiven,dd$CongruentBalls,dd$quantifier)

before = nrow(dd)
dd = dd %>%
  filter(CorrectAnswerGiven == "correct/semantic" | quantifier  == "Most" & CongruentBalls == 10 | quantifier  == "Some" & CongruentBalls > 5)
after = nrow(dd)
print(paste("excluded",(before-after)/9,"trials with incorrect responses"))

# exclude RTs that are 3sds away from the mean
before = nrow(dd)
dd$logRT = log(dd$RT)
ggplot(dd, aes(x=RT)) +
  geom_histogram()
ggplot(dd, aes(x=logRT)) +
  geom_histogram()

dd = dd %>%
  filter(logRT < mean(logRT) + 3*sd(logRT) & logRT > mean(logRT) - 3*sd(logRT))
after = nrow(dd)
print(paste("excluded",before-after,"data points with RTs more than 3 sds away from mean"))

ggplot(dd, aes(x=RT)) +
  geom_histogram()
ggplot(dd, aes(x=logRT)) +
  geom_histogram()



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

# plot only quantifier and color region and respondertype
agr = dd %>%
  filter(Region %in% c("QUANT","TGW")) %>%
  group_by(Region,CorrectAnswer,quantifier,CongruentBalls,ResponderType) %>%
  summarise(Mean=mean(RT),CILow=ci.low(RT),CIHigh=ci.high(RT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh)

ggplot(agr, aes(x=CongruentBalls,y=Mean,color=quantifier,group=quantifier)) +
  geom_point() +
  geom_line(size=2) +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_grid(Region~ResponderType) +
  scale_x_continuous(breaks=seq(0,10,by=1))

# plot only quantifier and color region and respondertype (log rts)
agr = dd %>%
  filter(Region %in% c("QUANT","TGW")) %>%
  group_by(Region,CorrectAnswer,quantifier,CongruentBalls,ResponderType) %>%
  summarise(Mean=mean(logRT),CILow=ci.low(logRT),CIHigh=ci.high(logRT)) %>%
  mutate(YMin=Mean-CILow,YMax=Mean+CIHigh)

ggplot(agr, aes(x=CongruentBalls,y=Mean,color=quantifier,group=quantifier)) +
  geom_point() +
  geom_line(size=2) +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_grid(Region~ResponderType) +
  scale_x_continuous(breaks=seq(0,10,by=1))

