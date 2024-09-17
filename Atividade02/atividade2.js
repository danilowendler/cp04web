function adicionarProdutoAnimado(id, nome, valor, quantidade) {
    adicionarProduto(id, nome, valor, quantidade);

    const button = event.target;
    const cartIcon = document.querySelector('.cart-icon');

    const buttonClone = button.cloneNode(true);
    buttonClone.style.position = 'absolute';
    buttonClone.style.left = `${button.getBoundingClientRect().left}px`;
    buttonClone.style.top = `${button.getBoundingClientRect().top}px`;
    buttonClone.style.width = `${button.offsetWidth}px`;
    buttonClone.style.height = `${button.offsetHeight}px`;
    buttonClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    buttonClone.style.zIndex = 1000;

    document.body.appendChild(buttonClone);

    setTimeout(() => {
        buttonClone.style.transform = `translate(${cartIcon.getBoundingClientRect().left - button.getBoundingClientRect().left}px, ${cartIcon.getBoundingClientRect().top - button.getBoundingClientRect().top}px) scale(0.1)`;
        buttonClone.style.opacity = 0;
    }, 100);

    setTimeout(() => {
        buttonClone.remove();
    }, 1000);

    const cartCount = document.getElementById('cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + quantidade;
}

function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(produto => produto.id === id);
    
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

function exibirCarrinho() {
    const listaProdutos = document.getElementById('lista-produtos');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        listaProdutos.innerHTML = "Seu carrinho está vazio!";
    } else {
        listaProdutos.innerHTML = '';
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${produto.nome} - ${produto.quantidade}x R$${produto.valor.toFixed(2)}</span>
                <button onclick="removerProduto(${produto.id})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    }
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function allowDrop(event) {
    event.preventDefault();
    document.querySelector('.cart-icon').classList.add('dragover'); 
}

function drag(event) {
    const produtoId = event.target.id.replace('produto', '');
    event.dataTransfer.setData('produtoId', produtoId);
}

function dropLeave(event) {
    document.querySelector('.cart-icon').classList.remove('dragover');
}

function drop(event) {
    event.preventDefault();
    document.querySelector('.cart-icon').classList.remove('dragover'); 

    const produtoId = event.dataTransfer.getData('produtoId');
    
    switch (produtoId) {
        case '1':
            adicionarProduto(1, 'Camiseta', 29.99, 2);
            break;
        case '2':
            adicionarProduto(2, 'Calça Jeans', 99.90, 1);
            break;
        case '3':
            adicionarProduto(3, 'Tênis', 149.90, 1);
            break;
        default:
            break;
    }

    const cartCount = document.getElementById('cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1; 
}

