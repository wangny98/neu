package com.ineuron.domain.user.valueobject;

public enum Permission {
	
	Read("只读权限", 1), 
	Write("写权限", 2);

	private String name;
	private int index;

	// 构造方法，注意：构造方法不能为public，因为enum并不可以被实例化
	private Permission(String name, int index) {
		this.name = name;
		this.index = index;
	}

	public static String getName(int index) {
		for (Permission c : Permission.values()) {
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