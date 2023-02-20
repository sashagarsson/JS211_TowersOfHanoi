'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing? - showing what is inside each stack
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // pop() the last piece in the startStack and push() to the endStack
  // if doesn't work then try stacks[startStack.pop()]
    stacks[endStack].push(stacks[startStack].pop()) 
  
  }


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // 1.Move a startStack value to an empty endStack value = true
        // if endStack is empty, which means stacks.endStack.length = 0
        let moveItem = stacks[startStack].slice(-1)[0]; 
        let lastItem = stacks[endStack].slice(-1)[0];

  if (stacks[endStack].length === 0) {
    return true;
  } else if ((stacks[endStack].length > 0) && (moveItem < lastItem)) {
    return true;
  } else {
    return false;
  }
}
  // 2.Move a startStack value to an endStack if the endStack value is a higher number = true
  // 3.Move a startStack value to an endStack if the endStack value is a lower number = false
        // slice(-1) gets the last element of an arry
        // reference w3 schools --> under JS array slice
  // 4.Select a startStack that's empty = false
      // if stacks.startStack.length = 0

  // 5.Enter something besides a,b,c = false
      // if !a or !b or !c
  // this function should return true or false



// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // If b array or c array = [4,3,2,1] you win
  // Assume isLegal caught all the wrong moves, and the array is in the correct order
  // so that means the game is over when b or c has 4 elements
    // stacks["b"].length = 4 // might be stacks.b.length=4
    // stacks["c"].length = 4
    if ((stacks.b.length === 4) || (stacks.c.length === 4)) {
      return true;
    } else {
      return false;
    }
  }
  

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Take in the two args
  // Check if isLegal
    // If true, movePiece
    //if false, display error message
  // Call checkForWin
    // if true, display win message
    // if false, display keep playing message
    movePiece(startStack, endStack);
    if (checkForWin()) {
      console.log('YOU WIN');
    }
  }


const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
