import { Tree } from "./TreeFactory";
import { prettyPrint } from "../prettyPrint";

export function driver(){
    console.log("Logs below are from driver.js.\nAn array of random values <100 is created and various tests are done on the BST");
    const randomArr = generateArray(20)
    const tree = Tree(randomArr);
    console.log("Initial array: ", randomArr);
    prettyPrint(tree.root);
    // Confirm that the tree is balanced by calling isBalanced.
    console.log("Should return true for balanced", tree.isBalanced()); 

    //Print out all elements in level, pre, post, and in order.
    console.log("Level: ",tree.levelOrder())
    console.log("Preorder: ", tree.preOrder());
    console.log("Postorder: ", tree.postOrder());
    console.log("Inorder: ", tree.inOrder());

    //Unbalance the tree by adding several numbers > 100
    console.log("Three nodes with values > 100 are inserted:");
    tree.insertNode(101)
    tree.insertNode(201)
    tree.insertNode(301)
    prettyPrint(tree.root);

    //Confirm that the tree is unbalanced by calling isBalanced.
    console.log("Should return false for unbalanced", tree.isBalanced()); //should return false

    //Balance the tree by calling rebalance.
    console.log("rebalance function is called");
    tree.rebalance();
        
    //Confirm that the tree is balanced by calling isBalanced.
    console.log("Should return true again for balanced", tree.isBalanced()); //should return true
        
    //Print out all elements in level, pre, post, and in order.
    console.log("Level: ",tree.levelOrder())
    console.log("Preorder: ", tree.preOrder());
    console.log("Postorder: ", tree.postOrder());
    console.log("Inorder: ", tree.inOrder());
    prettyPrint(tree.root);

}

function generateArray(l){return Array.from({length: l}, ()=> Math.floor(Math.random() * 100))}

