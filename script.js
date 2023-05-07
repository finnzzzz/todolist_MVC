//模型 存取所有list content [{text: 'exercise', completed: false},......]
model = {
  items: [],
};

//視圖 將model中數據渲染到頁面，並判斷使用者的交互，
view = {
  //刪除列表中的所有內容 (ul底下的所有li)，防止重複渲染舊數據
  clearList: function () {
    let range = document.createRange();
    range.selectNodeContents(document.getElementById("list"));
    range.deleteContents();
  },

  //將model中的數據，動態生成HTML元素並插入到HTML中
  render: function () {
    this.clearList();

    if (model.items.length != 0) {
      list = document.getElementById("list");
      for (let i = 0; i < model.items.length; i++) {
        item = document.createElement("li");
        span = document.createElement("span");
        check = document.createElement("a");
        cross = document.createElement("a");
        iconCheck = document.createElement("i");
        iconCross = document.createElement("i");

        item.className = "item";
        span.className = "item-text";
        check.className = "item-complete";
        cross.className = "item-delete";

        span.textContent = model.items[i].text;

        if (model.items[i].completed)
          span.setAttribute(
            "style",
            "text-decoration:line-through; color:#bbb;"
          );
        iconCheck.setAttribute("class", "icon ion-md-checkmark");
        iconCross.setAttribute("class", "icon ion-md-trash");

        check.setAttribute("onclick", `controller.completeItem(${i})`);
        cross.setAttribute("onclick", `controller.deleteItem(${i})`);

        check.appendChild(iconCheck);
        cross.appendChild(iconCross);
        item.appendChild(span);
        item.appendChild(check);
        item.appendChild(cross);

        list.appendChild(item);
      }
    }
    console.log(model);
  },

  //監聽使用者按下enter鍵後，獲取input.value並調用controller中的addItem()將新內容添加到model中
  addItem: function (e) {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
      input = document.getElementById("add-item");
      controller.addItem(input.value);
    }
  },
};

//控制器 view與model之間的橋樑
controller = {
  //初始化調用
  init: function () {
    view.render();
  },
  //接收到新內容後，判斷是否為空，並將內容添加到model的數組中，input.value清除，調用render()更新視圖
  addItem: function (item) {
    if (item.trim() !== "") {
      list_item = { text: item, completed: false };
      model.items.push(list_item);
      document.getElementById("add-item").value = "";
      view.render();
    }
  },

  //標記內容完成-接收list的index，取反完成狀態，調用render()更新視圖
  completeItem: function (item_index) {
    model.items[item_index].completed = !model.items[item_index].completed;
    console.log(model.items[item_index].completed);
    view.render();
  },

  //刪除內容-接收到list的index後 將model中相對應到的內容刪除
  deleteItem: function (item_index) {
    model.items.splice(item_index, 1);
    view.render();
  },
};

controller.init();
