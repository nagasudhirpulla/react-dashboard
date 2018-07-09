## Evaluating expressions supplied to the plotting function

It can be done using the expr-eval library - https://www.npmjs.com/package/expr-eval

It can be done by using infix to postfix conversion and then evaluating the postfix
https://gist.github.com/dineshrajpurohit/d14349fc48c6da937a04

Infix to postfix implementation can be done on our own using the Dijkstra's  Shunting-yard algorithm https://en.wikipedia.org/wiki/Shunting-yard_algorithm 

Expression evaluation can be done in Java using the exp4j library https://lallafa.objecthunter.net/exp4j/ 