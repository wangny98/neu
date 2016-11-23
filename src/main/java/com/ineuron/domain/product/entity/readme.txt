Domain entities will be put in this folder:
1.领域对象方法是业务价值的体现，而不是简单的getter， setter方法
2.业务逻辑应该在领域对象方法中，而不是在对象的调用者里
例子：将backlog item提交到sprint中， BacklogItem中的方法应该是commitTo