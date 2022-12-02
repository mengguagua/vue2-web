module.exports = function(babel) {
  let t = babel.types;
  return {
    visitor: {
      ExpressionStatement(path) {
        // path.replaceWith();
        // t.isIdentifier();
        if (path.node && path.node.expression && path.node.expression.callee && path.node.expression.callee.object
          && path.node.expression.callee.property && path.node.expression.arguments
          && path.node.expression.callee.object.name === 'console' && path.node.expression.callee.property.name === 'log') {
          if (path.node.expression.arguments[0].type === 'Identifier') {
            path.node.expression.arguments = [t.stringLiteral(path.node.expression.arguments[0].name), ...path.node.expression.arguments]
            console.log('path.node.expression.arguments2', path.node.expression.arguments);
          }
        }
      },

      // Identifier(path) {
      //   if (path.node.name === 'console' && path.parentPath.parent.arguments.length) {
      //     path.parentPath.parent.arguments.forEach((item) => {
      //       if (item.type === 'Identifier') {
      //         path.parentPath.parent.arguments = [t.stringLiteral(path.parentPath.parent.arguments[0].name), ...path.parentPath.parent.arguments]
      //       }
      //     });
      //     console.log('Identifier---',path.parentPath.parent.arguments);
      //   }
      // },

      // 变量声明函数
      // VariableDeclarator(path, state) {
        // VariableDeclarator 是要找的变量声明
        // if (path.node && path.node.id.name == "aaaa") {
          // console.log('path', path);
          // console.log('path.node', path.node);
          // console.log('path.node.id', path.node.id);
          // console.log('path.node.id.name', path.node.id.name);
          // 方式一：直接修改name
          // path.node.id.name = 'b';
          // 方式二：把id是a的ast换成b的ast
          // path.node.id = t.Identifier("b");
        // }
      // }
    }
  };
};
