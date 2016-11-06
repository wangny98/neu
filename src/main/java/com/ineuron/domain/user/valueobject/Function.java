package com.ineuron.domain.user.valueobject;

public enum Function {

	UserManagement("用户管理", 1), 
	ProductManagement("产品管理", 2), 
	OrderManagement("订单管理", 3),
	ClientManagement("已屏蔽", 4);

	private String name;
	private int index;

	// 构造方法，注意：构造方法不能为public，因为enum并不可以被实例化
	private Function(String name, int index) {
		this.name = name;
		this.index = index;
	}

	public static String getName(int index) {
		for (Function c : Function.values()) {
			if (c.getIndex() == index) {
				return c.name;
			}
		}
		return null;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
}
