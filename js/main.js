const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tree = [
    {
        type: "folder",
        name: "src",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "public",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "pages",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "service",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "utils",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "assets",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "config",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "hooks",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "styles",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "folder",
        name: "book",
        children: [
            {
                type: "folder",
                name: "components",
                children: [
                    {
                        type: "file",
                        name: "header.js",
                    },
                    {
                        type: "file",
                        name: "footer.js",
                    },
                ],
            },
            {
                type: "file",
                name: "index.js",
            },
        ],
    },
    {
        type: "file",
        name: "README.md",
    },
];

const treeElement = $("#tree");

function renderTree(nodes, container) {
    nodes.forEach((node) => {
        let icon;

        if (node.type === "folder") {
            icon = "📁";
        } else {
            icon = "📄";
        }

        // Tạo node
        const nodeElement = document.createElement("div");
        nodeElement.classList.add("node");
        nodeElement.dataset.type = node.type;

        // Tạo phần chứa tên
        const nameElement = document.createElement("span");
        nameElement.textContent = `${icon} ${node.name}`;

        nodeElement.appendChild(nameElement);
        container.appendChild(nodeElement);

        // CLICK
 

        nodeElement.onclick = function (event) {
            event.stopPropagation();

            const activeNode = $(".active");

            if (activeNode) {
                activeNode.classList.remove("active");
            }

            nodeElement.classList.add("active");

            if (node.type !== "folder") return;

            const childrenElement =
                nodeElement.querySelector(".children");

            if (childrenElement) {
                childrenElement.classList.toggle("hidden");
            }
        };
        // CHUỘT PHẢI
    

        nodeElement.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();

            const menu = document.createElement("div");

            menu.classList.add("context-menu");

            menu.innerHTML = `
                <div class="rename-btn">Rename</div>
                <div class="delete-btn">Delete</div>
            `;

            menu.style.left = event.clientX + "px";
            menu.style.top = event.clientY + "px";

            document.body.appendChild(menu);

            // RENAME

            const renameBtn = menu.querySelector(".rename-btn");

            renameBtn.onclick = function () {
                const newName = prompt(
                    "Nhập tên mới:",
                    node.name
                );

                if (newName) {
                    // Đổi tên trong data
                    node.name = newName;

                    // Chỉ thay đổi phần tên
                    nameElement.textContent = `${icon} ${node.name}`;
                }

                menu.remove();
            };

            // DELETE

            const deleteBtn = menu.querySelector(".delete-btn");

            deleteBtn.onclick = function () {

                // Tìm node hiện tại trong mảng cha
                const index = nodes.indexOf(node);

                // Nếu tìm thấy thì mới xóa
                if (index !== -1) {
                    nodes.splice(index, 1);
                }

                // Xóa khỏi giao diện
                nodeElement.remove();

                // Xóa menu
                menu.remove();
            };
        };

        // RENDER CHILDREN

        if (node.children) {
            const childrenElement = document.createElement("div");

            childrenElement.classList.add("children");

            nodeElement.appendChild(childrenElement);

            renderTree(node.children, childrenElement);
        }
    });
}

renderTree(tree, treeElement);
// treeElement.addEventListener("click",function(event)) {

// }
