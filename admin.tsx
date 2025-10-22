
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- BASE DE DATOS SIMULADA DE TIENDAS ---
// Esto estaría en un backend, pero se duplica aquí para la demo.
const storesData = {
    sachacacao: {
        id: 'sachacacao',
        name: 'Sacha Cacao',
        sectionTitle: 'Nuestra Cosecha',
        theme: {
            '--primary-brown': '#5D4037', '--primary-brown-light': '#efebe9', '--accent-gold': '#c59d5f',
            '--dark-text': '#3E2723', '--light-text': '#795548', '--background-color': '#FDFBF7',
            '--surface-color': '#FFFFFF', '--border-color': '#D7CCC8',
        },
        heroBanner: {
            imageUrl: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Sacha Cacao',
            subtitle: 'Del grano a tu corazón. Descubre el sabor auténtico del cacao artesanal.'
        },
        paymentInfo: {
            phone: '987654321', name: 'JUAN PEREZ', whatsapp: '51987654321'
        },
        chatInstruction: "Eres un asistente virtual de Sacha Cacao, una tienda especializada en productos artesanales de cacao. Eres amable, conocedor y apasionado por el cacao. Ayuda a los clientes a conocer los productos, sus beneficios, y a realizar sus compras.",
        products: [
            { id: 1, name: 'Cacao en Polvo 100% Orgánico', description: 'Nuestro cacao en polvo puro es ideal para repostería, bebidas calientes o batidos. Sabor intenso y sin aditivos.', price: 85.00, image: 'https://images.pexels.com/photos/4109943/pexels-photo-4109943.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { id: 2, name: 'Cacao Crudo Criollo x Kg', description: 'Granos de cacao criollo, la variedad más fina y aromática. Perfectos para tostar en casa o para chocolatería artesanal.', price: 50.00, image: 'https://images.pexels.com/photos/8977717/pexels-photo-8977717.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { id: 3, name: 'Cacao Tostado en Grano', description: 'Granos de cacao tostados a la perfección para resaltar sus notas de sabor. Un snack energético y delicioso.', price: 70.00, image: 'https://images.pexels.com/photos/7350796/pexels-photo-7350796.jpeg?auto=compress&cs=tinysrgb&w=600' },
        ]
    },
    cafedelvalle: {
        id: 'cafedelvalle',
        name: 'Café del Valle',
        sectionTitle: 'Nuestros Orígenes',
        theme: {
            '--primary-brown': '#4E342E', '--primary-brown-light': '#D7CCC8', '--accent-gold': '#FFC107',
            '--dark-text': '#3E2723', '--light-text': '#6D4C41', '--background-color': '#FBF9F6',
            '--surface-color': '#FFFFFF', '--border-color': '#BCAAA4',
        },
        heroBanner: {
            imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Café del Valle',
            subtitle: 'El aroma que despierta tus sentidos.'
        },
        paymentInfo: {
            phone: '999888777', name: 'MARIA GARCIA', whatsapp: '51999888777'
        },
        chatInstruction: "Eres un barista experto de Café del Valle, una tienda de café de especialidad. Conoces todo sobre el origen, tostado y métodos de preparación. Ayuda a los clientes a elegir el café perfecto para ellos.",
        products: [
            { id: 1, name: 'Café Geisha Tostado Medio', description: 'Notas florales de jazmín, bergamota y frutos tropicales. Acidez brillante y cuerpo sedoso.', price: 95.00, image: 'https://images.pexels.com/photos/4109744/pexels-photo-4109744.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { id: 2, name: 'Café Bourbon Lavado x Kg', description: 'Un clásico balanceado con notas a chocolate, caramelo y nuez. Ideal para espresso o filtrado.', price: 60.00, image: 'https://images.pexels.com/photos/3733005/pexels-photo-3733005.jpeg?auto=compress&cs=tinysrgb&w=600' },
        ]
    }
};

const AdminPanel: React.FC = () => {
    const [selectedStoreId, setSelectedStoreId] = useState<string>('sachacacao');
    const [formData, setFormData] = useState(storesData[selectedStoreId]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Cargar datos de la tienda seleccionada
        setFormData(JSON.parse(JSON.stringify(storesData[selectedStoreId])));
    }, [selectedStoreId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: e.target.value
            }
        }));
    };
    
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData(prev => ({
            ...prev,
            theme: {
                ...prev.theme,
                [key]: e.target.value
            }
        }));
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
        const newProducts = [...formData.products];
        newProducts[index] = {...newProducts[index], [field]: e.target.value};
        setFormData(prev => ({ ...prev, products: newProducts }));
    };

    const handleSave = () => {
        console.log("--- SIMULANDO GUARDADO EN BACKEND ---");
        console.log("ID de la tienda:", selectedStoreId);
        console.log("Datos a guardar:", formData);
        setNotification(`Cambios para "${formData.name}" guardados en la consola.`);
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <div className="admin-container">
            {notification && <div className="notification">{notification}</div>}
            <header className="admin-header">
                <h1>Panel de Administración</h1>
                <div className="store-selector">
                    <label htmlFor="store-select">Seleccionar Tienda:</label>
                    <select id="store-select" value={selectedStoreId} onChange={(e) => setSelectedStoreId(e.target.value)}>
                        {Object.keys(storesData).map(storeId => (
                            <option key={storeId} value={storeId}>
                                {storesData[storeId].name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>
            <main className="admin-main">
                <div className="form-section">
                    <h2>Datos Generales</h2>
                    <div className="form-group">
                        <label>Nombre de la Tienda</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Título de la Sección de Productos</label>
                        <input type="text" value={formData.sectionTitle} onChange={(e) => setFormData({...formData, sectionTitle: e.target.value})} />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Banner Principal</h2>
                    <div className="form-group">
                        <label>URL de la Imagen</label>
                        <input type="text" value={formData.heroBanner.imageUrl} onChange={(e) => handleInputChange(e, 'heroBanner', 'imageUrl')} />
                    </div>
                    <div className="form-group">
                        <label>Título del Banner</label>
                        <input type="text" value={formData.heroBanner.title} onChange={(e) => handleInputChange(e, 'heroBanner', 'title')} />
                    </div>
                    <div className="form-group">
                        <label>Subtítulo del Banner</label>
                        <input type="text" value={formData.heroBanner.subtitle} onChange={(e) => handleInputChange(e, 'heroBanner', 'subtitle')} />
                    </div>
                </div>
                
                <div className="form-section">
                    <h2>Información de Pago y Contacto</h2>
                    <div className="form-group">
                        <label>Número de Yape/Plin</label>
                        <input type="text" value={formData.paymentInfo.phone} onChange={(e) => handleInputChange(e, 'paymentInfo', 'phone')} />
                    </div>
                     <div className="form-group">
                        <label>Nombre del Titular</label>
                        <input type="text" value={formData.paymentInfo.name} onChange={(e) => handleInputChange(e, 'paymentInfo', 'name')} />
                    </div>
                     <div className="form-group">
                        <label>Número de WhatsApp (con cód. país)</label>
                        <input type="text" value={formData.paymentInfo.whatsapp} onChange={(e) => handleInputChange(e, 'paymentInfo', 'whatsapp')} />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Paleta de Colores</h2>
                    <div className="color-grid">
                    {Object.entries(formData.theme).map(([key, value]) => (
                        <div key={key} className="form-group color-group">
                            <label>{key}</label>
                            <div className="color-input-wrapper">
                                <input type="color" value={value} onChange={(e) => handleThemeChange(e, key)} />
                                <span>{value}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="form-section">
                    <h2>Gestión de Productos</h2>
                    {formData.products.map((product, index) => (
                        <div key={product.id} className="product-editor">
                            <img src={product.image} alt={product.name} />
                            <div className="product-fields">
                                <input type="text" value={product.name} onChange={(e) => handleProductChange(e, index, 'name')} placeholder="Nombre"/>
                                <textarea value={product.description} onChange={(e) => handleProductChange(e, index, 'description')} placeholder="Descripción"></textarea>
                                <input type="number" value={product.price} onChange={(e) => handleProductChange(e, index, 'price')} placeholder="Precio" />
                                <input type="text" value={product.image} onChange={(e) => handleProductChange(e, index, 'image')} placeholder="URL de imagen"/>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<AdminPanel />);
