Answer-prediction
==========
An answer prediction algorithm based on Bayesian prior and discrete optimization search.

Question
--------
Number of answers to a set of selection questions and their errors counts, how?to predict the answer to each question.

Algorithm
------------
The core part of the algorithm in `main.js`.
### Bayesian prior
The core part is `predictionOption` function. This function calculates the equivalent priori probability of an option for a problem. At first, we know the average probability of an option correcting is `1/4`. Then if a person 10 questions 4 correct, we assume that each question its option is correct probability is `4/10`. For an option he chooses, it is possible to calculate its equivalent prior probability for `(4/10)/(1/4)`. On the contrary, the correct probability of the option he has not chosen is `(1-(4/10))/(1/4)`. So, in turn, apply the formula to each person's choice. The correct prior probability of each option can be obtained by product of the result. 

### discrete optimization search
The most important option for Bayesian priori probabilities is not necessarily the correct answer. This is a necessary condition for the right answer that judge the same score as the sample for each person¡¯s answer. This is a search optimization problem with a dimension count equal to the number of questions, where each dimension can obtain four discrete values (ABCD).

We use a similar gradient descent method to search. The value of the loss function is the difference between the actual score and the score of judge using the answer of the current prediction answer for each person.

It is noteworthy that we do not need to obtain a derivative of the position. For each question, the correct probability of each option has been obtained. If the question¡¯s loss can continue to decline, it will advance to the position of maximum probability.