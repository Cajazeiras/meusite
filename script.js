// Inicializa um array para armazenar os projetos
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Carrega os projetos do localStorage ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    if (document.title === "Projetos da Equipe com Imagens") {
        displayProjects(); // Exibe projetos na página de projetos
    } else if (document.title === "Ver Projetos") {
        displayProjects(); // Exibe projetos na página de visualização
    }
});

// Adiciona um listener ao formulário para salvar novos projetos
document.getElementById('new-project-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('image');

    if (imageInput.files.length > 0) {
        const image = imageInput.files[0];
        saveProject(title, description, image);
        this.reset(); // Reseta o formulário
    }
});

// Função para salvar o projeto
function saveProject(title, description, image) {
    const project = {
        title,
        description,
        image: URL.createObjectURL(image) // Cria um URL para a imagem
    };
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects)); // Salva no localStorage
}

// Função para exibir projetos
function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Limpa a lista antes de adicionar os projetos
    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}">
        `;
        projectList.appendChild(projectCard);
    });
}

// Função para pesquisar projetos
function searchProjects() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
    );

    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Limpa a lista antes de adicionar os projetos filtrados
    filteredProjects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}">
        `;
        projectList.appendChild(projectCard);
    });
}