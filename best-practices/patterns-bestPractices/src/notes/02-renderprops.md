Another important react pattern is the render props pattern

Pass function as value.

Component 1 defines a function must return something renderable
Component 1 passes this function to it's children say compoent 2
and Component 2 returns the result of calling that received function. That's why component 1 must return something renderable

We'll implement a search feature:
