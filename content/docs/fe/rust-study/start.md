---
title: 准备阶段
description: 环境安装与配置
---

从零学习 Rust 的个人记录，非严格的博文。

## 安装

通过 `Rustup` 工具安装和版本管理。`rustup update` 安装最新版本

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

安装官方编译器、以及它的包管理器 `Cargo`

```shell
Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /Users/admin/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  /Users/admin/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /Users/admin/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /Users/admin/.profile
  /Users/admin/.bash_profile
  /Users/admin/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:

   default host triple: x86_64-apple-darwin
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
```

选择默认安装：`> 1`

```shell
info: profile set to 'default'
info: default host triple is x86_64-apple-darwin
info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: latest update on 2023-08-03, rust version 1.71.1 (eb26296b5 2023-08-03)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
info: downloading component 'rust-std'
info: downloading component 'rustc'
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
info: installing component 'rust-std'
info: installing component 'rustc'
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-apple-darwin'
  stable-x86_64-apple-darwin installed - rustc 1.71.1 (eb26296b5 2023-08-03)

Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, run:
source "$HOME/.cargo/env"
```

## Cargo

Rust 的包管理器和构架工具，常用命令行：

- 构建： `cargo build`
- 启动项目： `cargo run`
- 测试项目： `cargo test`
- 构建项目文档： `cargo doc`
- 将库发布到 [crates.io](https://crates.io/) ： `cargo publish`
  - crates.io 是Rust 包的仓库，类似 npmjs.com
  - 在 Rust 中，通常把包称作 crates

- 测试成功安装 Rust 和 Cargo：`cargo --version`

```shell
➜  ~ cargo --version
cargo 1.71.1 (7f1d04c00 2023-07-29)
```

## Hello Rust

`cargo new hello-rust` 创建新项目

```shell
hello-rust
|- Cargo.toml # Rust 的清单文件，其中包含了项目的元数据和依赖库。
|- .gitignore # 忽略 /target
|- src
  |- main.rs # 编写应用代码的地方
```

在 `main.rs` 文件中，打印 `Hello, world!`

```rust
fn main() {
    println!("Hello, world!");
}
```

这里的 `println!` 类似 `console.log`，用于在控制台打印内容。为什么这里的标识符后面有个`!`？

> 使用符号 `!` ，意味着调用的是Rust 宏（macro）而不是普通函数

什么是宏，有待后续探索。

`cargo run` 运行项目

```shell
➜  hello-rust git:(master) ✗ cargo run
   Compiling hello-rust v0.1.0 (/Users/admin/工程/z1m97/hello-rust)
error: linking with `cc` failed: exit status: 1
  |
  = note: # ...一长串的错误和地址
  = note: xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

error: could not compile `hello-rust` (bin "hello-rust") due to previous error
```

运行失败，提示缺少 `xcrun` 命令行工具。 `xcrun` 是 Xcode 的工具链的一部分，一般用来配置编译环境。下载安装好 Xcode 后，运行 `xcode-select --install`。

安装完成后重新 `cargo run`，运行成功。

```shell
➜  hello-rust git:(master) ✗ cargo run
   Compiling hello-rust v0.1.0 (/Users/admin/hello-rust)
    Finished dev [unoptimized + debuginfo] target(s) in 2.46s
     Running `target/debug/hello-rust`
Hello, world!
```

## 依赖的安装与使用

在新建项目的时候默认生成了个 Cargo.toml 文件，即 Rust 的清单文件，其中包含了项目的元数据和依赖库，类似 node 里的 package.json

```toml
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

在 dependencies 下面添加依赖，示例使用 [`ferris-says`](https://crates.io/crates/ferris-says)

```toml
[dependencies]
ferris-says = "0.2"
```

然后运行 `cargo build`，之后 Cargo 就会安装该依赖。

```shell
Updating crates.io index
Downloaded textwrap v0.13.4
Downloaded unicode-width v0.1.10
Downloaded smawk v0.3.1
Downloaded smallvec v0.4.5
Downloaded ferris-says v0.2.1
Downloaded 5 crates (99.9 KB) in 1.47s
Compiling unicode-width v0.1.10
Compiling smawk v0.3.1
Compiling smallvec v0.4.5
Compiling textwrap v0.13.4
Compiling ferris-says v0.2.1
Compiling hello-rust v0.1.0 (/Users/admin/工程/z1m97/hello-rust)
Finished dev [unoptimized + debuginfo] target(s) in 6.33s
```

该示例中，接着再将 `main.rs` 编辑为：

```rust
use ferris_says::say;
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();

    let mut writer = BufWriter::new(stdout.lock());
    say(message.as_bytes(), width, &mut writer).unwrap();
}
```

然后运行 `cargo run`，输出结果:

```shell
 __________________________
< Hello fellow Rustaceans! >
 --------------------------
        \
         \
            _~^~^~_
        ) /  o o  \ (/
          '_   -   _'
          / '-----' \
```

到这里就完成了学习 rust 的第一个应用，在控制台上打印出了东西。

到这里，思考下：

- rust 运行会以 `src/main.rs` 文件中的 `main` 方法作为入口
- 方法的声明 `fn functioName() {}`
- 通过 `use` 引用官方标准库和第三方库，比如这里的 `std::io`
- 包的子模块或方法的引用通过 `::` 符号，类似 js 里的点
- 引用多个模块使用 `module::{subModule,subModule2}`，`use std::io::{stdout, BufWriter}` 类似 `import {stdout, BufWriter} from 'std::io'`
- 创建字符串得 `String::from("xxxxx")`，`String` 没引用是个全局的对象
- `BufWriter::new` 应该是创建了新对象，这个 `new` 方法是通用的吗？字符串为啥是 `String::from` 而不是 `String::new`
- `let` 声明和 js 里的 `let` 有何联系，`let mut writer` 和 `&mut writer` 是干嘛的
- 在 ferris-says 的文档里，main.rs 文档上加了个 `extern crate ferris_says;` 这是干嘛的？看着是声明下外部 crate，但是好像也没起什么作用

带着这些思考和疑问，继续前进。
