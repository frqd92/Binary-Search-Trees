export function Tree(initialArr){
    const arr = initialArr.sort((a,b)=>a-b).filter((elem,i)=> initialArr.indexOf(elem) === i )
    let root = buildTree(arr)
    function buildTree(arr, start=0, end=arr.length-1){
      if(start===end) return Node(arr[start])
      else if(end-start===1){
        const node = Node(arr[start])
        node.right = Node(arr[end]);
        return node
      }
      const middle = Math.floor((start + end) / 2)
      const root = Node(arr[middle]);
      root.left = buildTree(arr, start, middle-1);
      root.right = buildTree(arr, middle+1, end);
      return root
    }
    function insertNode(value, treeNode=this.root){
      if(value===treeNode.data) return true;
      const path = value>treeNode.data ? "right" : "left";
      if(treeNode[path]===null){
        treeNode[path] = Node(value)
        return
      }
      return insertNode(value, treeNode[path])
    }
    function deleteNode(value){
      let target = this.root; 
      let parent;
      while(target.data!==value){
        const path = target.data < value ? "right":"left";
        parent = target;
        target = target[path];
        if((target.right===null && target.left===null) && target.data!==value){ //element not found
          return null;
        }
      }
      if(target.right!==null && target.left!==null){ //node has two branches
          let rightNode = target.right;
          let prev;
          while(rightNode.left!==null){
            prev = rightNode;
            rightNode=rightNode.left;
          }
          target.data = rightNode.data;
          prev.left = rightNode.right;
      }
      else if((target.right===null && target.left!==null) || (target.left===null && target.right!==null)){ //node has 1 branch
        const child = target.right !== null ? target.right : target.left;
        const path = target.data > parent.data ? "right" : "left";
        parent[path] = child;
      }
      else if(target.right === null && target.left === null){ //node is a leaf
        const path = target.data > parent.data ? "right" : "left";
        parent[path] = null;
      }
  
    }
    function findNode(value){
      let node = this.root;
      while(node.data !== value){
        const path = value > node.data ? "right" : "left";
        if(node[path] === null){
          console.log("Element not found");
          return "Element not found"
        }
        node = node[path]
      }
      console.log(node);
      return node
      
    }
    function levelOrder(fn){
      const queue = [this.root];
      const levelOrderArr = [];
      while(queue.length!==0){
        if(queue[0].left){ queue.push(queue[0].left) }
        if(queue[0].right){ queue.push(queue[0].right) }
        const node = queue.shift();
        fn ? levelOrderArr.push(fn(node.data)) : levelOrderArr.push(node.data)
      }
      return levelOrderArr
    }
    function levelOrderRecursive(fn, queue=[this.root], levelOrderArr=[]){
      if(queue.length===0) return levelOrderArr
      if(queue[0].left){ queue.push(queue[0].left) }
      if(queue[0].right){ queue.push(queue[0].right) }
      const node = queue.shift()
      fn ? levelOrderArr.push(fn(node.data)) : levelOrderArr.push(node.data)
      return levelOrderRecursive(fn, queue, levelOrderArr)
    }
    function inOrder(fn, node = root, inorderArr = []){
      if(node===null) return
      inOrder(fn, node.left, inorderArr)
      fn ? inorderArr.push(fn(node.data)) : inorderArr.push(node.data);
      inOrder(fn, node.right, inorderArr)
      return inorderArr
    }
    function postOrder(fn, node = root, postOrderArr = []){
      if(node===null) return
      postOrder(fn, node.left, postOrderArr)
      postOrder(fn, node.right, postOrderArr)
      fn ? postOrderArr.push(fn(node.data)) : postOrderArr.push(node.data);
      return postOrderArr
    }
    function preOrder(fn, node = root, preOrderArr = []){
      if(node===null) return
      fn ? preOrderArr.push(fn(node.data)) : preOrderArr.push(node.data);
      preOrder(fn, node.left, preOrderArr)
      preOrder(fn, node.right, preOrderArr)
      return preOrderArr
    }
    function height(node){
      if(node === null ) return -1
      if(node.left === null && node.right === null) return 0
      const leftSide = 1 + height(node.left)
      const rightSide = 1 + height(node.right)
      return leftSide < rightSide ? rightSide : leftSide;
    }
    function depth(node){
      if(this.root===node) return 0
      let start = this.root, d = 0;
      while(start!==node){
        start = node.data < start.data ? start.left: start.right;
        d++;
      }
      return  d
    }
    function isBalanced(){ 
      
      return Math.abs(height(this.root.left) - height(this.root.right)) > 1 ? false : true 
    }
    function rebalance(){
      this.root = buildTree(inOrder());
    }
  
    return Object.assign({}, {root, insertNode, deleteNode, findNode, levelOrder, levelOrderRecursive, inOrder, postOrder, preOrder, height, depth, isBalanced, rebalance})
  }
  function Node(data, left=null, right=null){
    return {data, left, right}
  }
