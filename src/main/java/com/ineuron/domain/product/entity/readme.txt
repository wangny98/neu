Domain entities will be put in this folder:
1.领域对象方法是业务价值的体现，而不是简单的getter， setter方法
2.业务逻辑应该在领域对象方法中，而不是在对象的调用者里
例子：将backlog item提交到sprint中， BacklogItem中的方法应该是commitTo

3.业务逻辑不要放在前端， 以package com.ineuron.domain.product.entity.Product为例，界面上与product相关的内容如下：
private ProductCategory category;
private Formula formula;
private List<ManufacturingProcess> manufacturingProcesses;
private List<Material> materials;
private List<Operation> operations;
private List<OperationType> operationTypes;
这些内容应该在Product类中组装后，不要在界面上请求多次后台获得数据，这样的好处是，将来的业务逻辑修改，只需集中在Product。