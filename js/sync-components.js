function compLoadingFunction() {
    async function components_loader(path, element) {
        try {
            const fetch_data = await fetch(path);
            const data = await fetch_data.text();
            document.querySelector(element).innerHTML = data;
        } catch (error) {
            console.error(`Failed to load ${path}:`, error);
            document.querySelector(element).innerHTML = '<p>Sorry, component failed to load!</p>';
        }
    }

    async function load_components() {
        await components_loader('components/head_navbar.html', 'header');
        await components_loader('components/footer.html', '#footer');
    }

    async function elementsLoaded() {
        await load_components();
        document.dispatchEvent(new CustomEvent("componentsLoaded"));
    }

    elementsLoaded(); 
}

compLoadingFunction();
