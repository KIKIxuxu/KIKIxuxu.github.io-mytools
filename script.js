const defaultCategories = [
    { id: 'dev', name: '开发工具', color: '#667eea' },
    { id: 'design', name: '设计工具', color: '#f56565' },
    { id: 'productivity', name: '效率工具', color: '#48bb78' },
    { id: 'media', name: '媒体工具', color: '#ed8936' },
    { id: 'utilities', name: '实用工具', color: '#9f7aea' }
];

const defaultTools = [
    { name: 'GitHub', desc: '代码托管平台', url: 'https://github.com', icon: '💻', category: 'dev' },
    { name: 'CodePen', desc: '在线代码编辑器', url: 'https://codepen.io', icon: '✏️', category: 'dev' },
    { name: 'JSON校验', desc: 'JSON格式化工具', url: 'https://jsonlint.com', icon: '📋', category: 'dev' },
    { name: '正则测试', desc: '正则表达式测试', url: 'https://regex101.com', icon: '🔍', category: 'dev' },
    { name: 'Figma', desc: '在线设计协作', url: 'https://www.figma.com', icon: '🎨', category: 'design' },
    { name: 'Pixlr', desc: '在线图片编辑', url: 'https://www.pixlr.com', icon: '🖼️', category: 'design' },
    { name: '图片压缩', desc: '智能图片压缩', url: 'https://tinypng.com', icon: '📷', category: 'design' },
    { name: '图标库', desc: '图标搜索下载', url: 'https://www.iconfinder.com', icon: '🧩', category: 'design' },
    { name: 'Trello', desc: '项目管理工具', url: 'https://trello.com', icon: '📋', category: 'productivity' },
    { name: 'Notion', desc: '笔记协作平台', url: 'https://www.notion.so', icon: '📝', category: 'productivity' },
    { name: 'Canva', desc: '在线设计工具', url: 'https://www.canva.com', icon: '🎭', category: 'productivity' },
    { name: 'Markdown', desc: '在线编辑器', url: 'https://dillinger.io', icon: '✍️', category: 'productivity' },
    { name: 'YouTube', desc: '视频分享平台', url: 'https://www.youtube.com', icon: '📺', category: 'media' },
    { name: 'SoundCloud', desc: '音乐分享平台', url: 'https://soundcloud.com', icon: '🎵', category: 'media' },
    { name: 'Photopea', desc: '在线PS工具', url: 'https://www.photopea.com', icon: '🖌️', category: 'media' },
    { name: '格式转换', desc: '文件格式转换', url: 'https://www.convertio.co', icon: '🔄', category: 'media' },
    { name: '时间戳转换', desc: 'Unix时间转换', url: 'https://www.epochconverter.com', icon: '⏰', category: 'utilities' },
    { name: '二维码生成', desc: '在线生成二维码', url: 'https://www.qr-code-scanner.com', icon: '📱', category: 'utilities' },
    { name: 'IP查询', desc: '查询IP信息', url: 'https://www.ipify.org', icon: '🌐', category: 'utilities' },
    { name: '单位换算', desc: '各种单位转换', url: 'https://www.unitconverters.net', icon: '📏', category: 'utilities' }
];

function getCategories() {
    const saved = localStorage.getItem('categories');
    if (saved) {
        return JSON.parse(saved);
    }
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
    return defaultCategories;
}

function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function getTools() {
    const saved = localStorage.getItem('tools');
    if (saved) {
        return JSON.parse(saved);
    }
    localStorage.setItem('tools', JSON.stringify(defaultTools));
    return defaultTools;
}

function saveTools(tools) {
    localStorage.setItem('tools', JSON.stringify(tools));
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function updateCurrentCategoryDisplay(categoryId) {
    const container = document.getElementById('currentCategory');
    const categories = getCategories();
    
    if (categoryId === 'all') {
        container.innerHTML = '<h2>当前分类：<span class="category-badge">全部工具</span></h2>';
    } else {
        const cat = categories.find(c => c.id === categoryId);
        if (cat) {
            container.innerHTML = `<h2>当前分类：<span class="category-badge" style="background: linear-gradient(135deg, ${cat.color}, ${adjustColor(cat.color, -20)});">${cat.name}</span></h2>`;
        } else {
            container.innerHTML = '<h2>当前分类：<span class="category-badge">未知分类</span></h2>';
        }
    }
}

function renderCategories() {
    const tabs = document.getElementById('categoryTabs');
    const categories = getCategories();
    
    tabs.innerHTML = '<button class="tab active" data-category="all"><span>全部</span></button>';
    
    categories.forEach(cat => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.setAttribute('data-category', cat.id);
        tab.innerHTML = `
            <span class="tab-color" style="background: ${cat.color};"></span>
            <span>${cat.name}</span>
            <span class="delete-tab" data-category-id="${cat.id}">×</span>
        `;
        tabs.appendChild(tab);
    });
}

function renderCategorySelect(selectId) {
    const select = document.getElementById(selectId);
    const categories = getCategories();
    
    select.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function renderCategoryList() {
    const list = document.getElementById('categoryList');
    const categories = getCategories();
    
    list.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.innerHTML = `
            <div class="category-color" style="background: ${cat.color};"></div>
            <span class="category-name">${cat.name}</span>
            <button class="edit-btn" data-category-id="${cat.id}">✏️</button>
            <button class="delete-cat-btn" data-category-id="${cat.id}">🗑️</button>
        `;
        list.appendChild(item);
    });
}

function renderTools(tools) {
    const grid = document.getElementById('toolsGrid');
    const categories = getCategories();
    grid.innerHTML = '';
    
    tools.forEach((tool, index) => {
        const cat = categories.find(c => c.id === tool.category);
        const iconColor = cat ? cat.color : '#667eea';
        
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.dataset.category = tool.category;
        card.dataset.index = index;
        card.dataset.url = tool.url;
        card.draggable = true;
        
        card.innerHTML = `
            <button class="drag-handle" draggable="false">☰</button>
            <div class="tool-actions">
                <button class="action-btn edit-btn" data-index="${index}">✏️</button>
                <button class="action-btn delete-btn" data-index="${index}">×</button>
            </div>
            <div class="tool-icon" style="background: linear-gradient(135deg, ${iconColor}, ${adjustColor(iconColor, -30)});">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        `;
        grid.appendChild(card);
    });
    
    initDragAndDrop();
}

function initDragAndDrop() {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('dragleave', handleDragLeave);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('click', handleToolCardClick);
    });
}

function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

let draggedIndex = -1;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.closest('.tool-card')?.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.closest('.tool-card')?.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.closest('.tool-card')?.classList.remove('drag-over');
    
    const dropIndex = parseInt(e.target.closest('.tool-card')?.dataset.index);
    if (dropIndex !== undefined && draggedIndex !== -1 && draggedIndex !== dropIndex) {
        const tools = getTools();
        const draggedTool = tools.splice(draggedIndex, 1)[0];
        tools.splice(dropIndex, 0, draggedTool);
        saveTools(tools);
        renderTools(tools);
    }
    
    document.querySelectorAll('.tool-card').forEach(card => {
        card.classList.remove('dragging', 'drag-over');
    });
    draggedIndex = -1;
}

function handleToolCardClick(e) {
    const target = e.target;
    if (!target.classList.contains('action-btn') && 
        !target.classList.contains('drag-handle') &&
        !target.parentElement?.classList.contains('tool-actions')) {
        const card = e.currentTarget;
        const url = card.dataset.url;
        if (url) {
            openTool(url);
        }
    }
}

function openAddModal() {
    renderCategorySelect('toolCategory');
    document.getElementById('addToolForm').reset();
    document.getElementById('toolIcon').value = '🔗';
    document.getElementById('addModal').classList.add('show');
}

function openEditModal(index) {
    const tools = getTools();
    const tool = tools[index];
    
    if (!tool) return;
    
    renderCategorySelect('editToolCategory');
    
    document.getElementById('editToolIndex').value = index;
    document.getElementById('editToolName').value = tool.name;
    document.getElementById('editToolDesc').value = tool.desc;
    document.getElementById('editToolUrl').value = tool.url;
    document.getElementById('editToolIcon').value = tool.icon;
    document.getElementById('editToolCategory').value = tool.category;
    
    document.getElementById('editModal').classList.add('show');
}

function openCategoryModal() {
    renderCategoryList();
    document.getElementById('categoryModal').classList.add('show');
}

function openSettingsModal() {
    const savedBg = localStorage.getItem('bgImage');
    const bgInput = document.getElementById('bgImageUrl');
    const preview = document.getElementById('bgPreview');
    
    if (savedBg) {
        bgInput.value = savedBg;
        preview.style.backgroundImage = `url(${savedBg})`;
        preview.classList.remove('empty');
        preview.innerHTML = '';
    }
    
    document.getElementById('settingsModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function handleAddToolFormSubmit(e) {
    e.preventDefault();
    
    const newTool = {
        name: document.getElementById('toolName').value.trim(),
        desc: document.getElementById('toolDesc').value.trim() || '暂无描述',
        url: document.getElementById('toolUrl').value.trim(),
        icon: document.getElementById('toolIcon').value.trim() || '🔗',
        category: document.getElementById('toolCategory').value
    };
    
    const tools = getTools();
    tools.push(newTool);
    saveTools(tools);
    renderTools(tools);
    closeModal('addModal');
    document.getElementById('addToolForm').reset();
    
    showToast('工具添加成功！');
}

function handleEditToolFormSubmit(e) {
    e.preventDefault();
    
    const index = parseInt(document.getElementById('editToolIndex').value);
    const tools = getTools();
    
    if (index >= 0 && index < tools.length) {
        tools[index] = {
            name: document.getElementById('editToolName').value.trim(),
            desc: document.getElementById('editToolDesc').value.trim() || '暂无描述',
            url: document.getElementById('editToolUrl').value.trim(),
            icon: document.getElementById('editToolIcon').value.trim() || '🔗',
            category: document.getElementById('editToolCategory').value
        };
        
        saveTools(tools);
        renderTools(tools);
        closeModal('editModal');
        
        showToast('工具修改成功！');
    }
}

function deleteTool(index) {
    if (confirm('确定要删除这个工具吗？')) {
        const tools = getTools();
        tools.splice(index, 1);
        saveTools(tools);
        renderTools(tools);
        showToast('工具已删除');
    }
}

function addCategory() {
    const name = document.getElementById('newCategoryName').value.trim();
    if (!name) {
        showToast('请输入分类名称', 'error');
        return;
    }
    
    const selectedColor = document.querySelector('#categoryColorPicker .color-item.selected');
    const color = selectedColor ? selectedColor.dataset.color : '#667eea';
    
    const categories = getCategories();
    const newId = 'cat_' + Date.now();
    
    categories.push({ id: newId, name, color });
    saveCategories(categories);
    renderCategories();
    renderCategorySelect('toolCategory');
    renderCategorySelect('editToolCategory');
    renderCategoryList();
    
    document.getElementById('newCategoryName').value = '';
    showToast('分类添加成功！');
}

function editCategory(catId) {
    const categories = getCategories();
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    
    const newName = prompt('输入新的分类名称:', cat.name);
    if (newName && newName.trim()) {
        cat.name = newName.trim();
        saveCategories(categories);
        renderCategories();
        renderCategorySelect('toolCategory');
        renderCategorySelect('editToolCategory');
        renderCategoryList();
        showToast('分类名称已更新');
    }
}

function deleteCategory(catId) {
    const categories = getCategories();
    if (categories.length <= 1) {
        showToast('至少需要保留一个分类', 'error');
        return;
    }
    
    if (!confirm('确定要删除这个分类吗？该分类下的工具将被移动到第一个分类。')) {
        return;
    }
    
    const catIndex = categories.findIndex(c => c.id === catId);
    if (catIndex === -1) return;
    
    const catName = categories[catIndex].name;
    const newDefaultCat = categories[0].id;
    const tools = getTools();
    tools.forEach(tool => {
        if (tool.category === catId) {
            tool.category = newDefaultCat;
        }
    });
    saveTools(tools);
    
    categories.splice(catIndex, 1);
    saveCategories(categories);
    
    renderCategories();
    renderCategorySelect('toolCategory');
    renderCategorySelect('editToolCategory');
    renderCategoryList();
    renderTools(getTools());
    
    showToast(`分类「${catName}」已删除`);
}

function saveSettings() {
    const bgUrl = document.getElementById('bgImageUrl').value;
    localStorage.setItem('bgImage', bgUrl);
    applyBgImage(bgUrl);
    closeModal('settingsModal');
    showToast('设置已保存');
}

function clearBgImage() {
    localStorage.removeItem('bgImage');
    document.getElementById('bgImageUrl').value = '';
    document.getElementById('bgPreview').style.backgroundImage = 'none';
    document.getElementById('bgPreview').classList.add('empty');
    document.getElementById('bgPreview').innerHTML = '<span class="empty">预览区域</span>';
    document.body.style.backgroundImage = 'none';
    document.body.classList.remove('has-bg');
}

function applyBgImage(url) {
    const body = document.body;
    if (url) {
        body.style.backgroundImage = `url(${url})`;
        body.classList.add('has-bg');
    } else {
        body.style.backgroundImage = 'none';
        body.classList.remove('has-bg');
    }
}

function searchTools() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const tools = getTools();
    
    const filtered = tools.filter(tool => 
        tool.name.toLowerCase().includes(keyword) || 
        tool.desc.toLowerCase().includes(keyword)
    );
    renderTools(filtered);
}

function filterTools(category) {
    const tools = getTools();
    const filtered = category === 'all' ? tools : tools.filter(t => t.category === category);
    renderTools(filtered);
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.tab[data-category="${category}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    updateCurrentCategoryDisplay(category);
}

function openTool(url) {
    window.open(url, '_blank');
}

function hideSkeleton() {
    const skeleton = document.getElementById('skeleton');
    if (skeleton) {
        skeleton.style.display = 'none';
    }
}

function showSkeleton() {
    const skeleton = document.getElementById('skeleton');
    if (skeleton) {
        skeleton.style.display = 'grid';
    }
}

function showLoadError() {
    const grid = document.getElementById('toolsGrid');
    grid.innerHTML = '<div class="load-error">加载失败，请刷新重试</div>';
}

function initEventListeners() {
    document.getElementById('addToolForm').addEventListener('submit', handleAddToolFormSubmit);
    document.getElementById('editToolForm').addEventListener('submit', handleEditToolFormSubmit);
    
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchTools();
        }
    });
    
    document.getElementById('bgImageUrl').addEventListener('input', (e) => {
        const preview = document.getElementById('bgPreview');
        const url = e.target.value;
        
        if (url) {
            preview.style.backgroundImage = `url(${url})`;
            preview.classList.remove('empty');
            preview.innerHTML = '';
        } else {
            preview.style.backgroundImage = 'none';
            preview.classList.add('empty');
            preview.innerHTML = '<span class="empty">预览区域</span>';
        }
    });
    
    document.querySelectorAll('#categoryColorPicker .color-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('#categoryColorPicker .color-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });
    document.querySelector('#categoryColorPicker .color-item')?.click();
    
    document.querySelectorAll('#colorPicker .color-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('#colorPicker .color-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            const color = item.dataset.color;
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = color;
            document.body.classList.remove('has-bg');
            localStorage.removeItem('bgImage');
            document.getElementById('bgImageUrl').value = '';
            const preview = document.getElementById('bgPreview');
            preview.style.backgroundImage = 'none';
            preview.classList.add('empty');
            preview.innerHTML = '<span class="empty">预览区域</span>';
        });
    });
    
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.id === 'addBtn') {
            openAddModal();
        } else if (target.id === 'categoryBtn') {
            openCategoryModal();
        } else if (target.id === 'settingsBtn') {
            openSettingsModal();
        } else if (target.id === 'searchBtn') {
            searchTools();
        } else if (target.classList.contains('close-btn')) {
            const modalOverlay = target.closest('.modal-overlay');
            if (modalOverlay) {
                closeModal(modalOverlay.id);
            }
        } else if (target.classList.contains('tab') && !target.classList.contains('delete-tab')) {
            const category = target.dataset.category;
            if (category) {
                filterTools(category);
            }
        } else if (target.classList.contains('delete-tab')) {
            const catId = target.dataset.categoryId;
            if (catId) {
                deleteCategory(catId);
            }
        } else if (target.classList.contains('edit-btn') && !target.closest('.tool-card')) {
            const catId = target.dataset.categoryId;
            if (catId) {
                editCategory(catId);
            }
        } else if (target.classList.contains('delete-cat-btn')) {
            const catId = target.dataset.categoryId;
            if (catId) {
                deleteCategory(catId);
            }
        } else if (target.classList.contains('edit-btn') && target.closest('.tool-card')) {
            const index = parseInt(target.dataset.index);
            if (!isNaN(index)) {
                openEditModal(index);
            }
        } else if (target.classList.contains('delete-btn') && target.closest('.tool-card')) {
            const index = parseInt(target.dataset.index);
            if (!isNaN(index)) {
                deleteTool(index);
            }
        } else if (target.classList.contains('site-item')) {
            const url = target.dataset.url;
            if (url) {
                openTool(url);
            }
        } else if (target.classList.contains('btn-secondary')) {
            const modalOverlay = target.closest('.modal-overlay');
            if (modalOverlay) {
                closeModal(modalOverlay.id);
            }
        } else if (target.classList.contains('btn-primary') && target.textContent === '添加分类') {
            addCategory();
        } else if (target.classList.contains('btn-primary') && target.textContent === '保存设置') {
            saveSettings();
        } else if (target.classList.contains('btn-secondary') && target.textContent === '清除背景') {
            clearBgImage();
        }
    });
}

function simulateLoadData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject(new Error('加载失败'));
            } else {
                resolve(getTools());
            }
        }, 300);
    });
}

function initApp() {
    showSkeleton();
    
    simulateLoadData()
        .then(tools => {
            hideSkeleton();
            renderTools(tools);
        })
        .catch(() => {
            hideSkeleton();
            showLoadError();
        });
    
    renderCategories();
    updateCurrentCategoryDisplay('all');
    
    const savedBg = localStorage.getItem('bgImage');
    if (savedBg) {
        applyBgImage(savedBg);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initApp();
});