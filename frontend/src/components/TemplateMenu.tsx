import { useEffect, useState } from "react"
import axios from "axios";
import './TemplateMenu.css'


interface Template {
    id: number;
    title: string;
    textBox: string;
}

interface TemplateMenuProps {
    setSelectedTemplate: (template: { title: string; textBox: string }) => void;
}
  
const TemplateMenu: React.FC<TemplateMenuProps> = ( {setSelectedTemplate} ) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [title, setTitle] = useState('');
    const [textBox, setTextBox] = useState('');
    const [isVisible, setVisibility] = useState<boolean>(false);
    const [templateCreater, setTemplateCreate] = useState<boolean>(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    

    const toggleVisibility = (): void => {
        setVisibility(prevState => !prevState);
        setTemplateCreate(false); 
        setTitle('');
        setTextBox('');
      };

    const toggleCreaterVisibility = (): void => {
        setTemplateCreate(true); 
    };

    const handleCancel = (): void => {
        setTemplateCreate(false); 
        setTitle('');
        setTextBox('');    
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/templates/${id}`);
            
            if (response.status === 200) {
                setTemplates((prevTemplates) => prevTemplates.filter(template => template.id !== id));
            }
        } catch (err) {
            console.error('Error deleting template:', err);
        }
    };


    const handleSubmit = async () => {
        if (editingTemplate) {
            await updateTemplate();
        } else {
            await createTemplate();
        }
    };

    const createTemplate = async () => {
        const data = {
            id: Date.now(),
            title: title,
            textBox: textBox
        };

        try {
            const response = await axios.post('http://localhost:3000/api/submit', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                setTemplates((prevTemplates) => [...prevTemplates, response.data]);
                setTitle('');
                setTextBox('');
                setTemplateCreate(false);
            }
        } catch (err) {
            console.error('Error creating template:', err);
        }
    };

    const updateTemplate = async () => {
        if (!editingTemplate) return;

        try {
            const response = await axios.put(`http://localhost:3000/api/templates/${editingTemplate.id}`, {
                title: title,
                textBox: textBox,
            });

            if (response.status === 200) {
                setTemplates((prevTemplates) =>
                    prevTemplates.map(t => t.id === editingTemplate.id ? response.data : t)
                );
                setTitle('');
                setTextBox('');
                setTemplateCreate(false);
                setEditingTemplate(null);
            }
        } catch (err) {
            console.error('Error updating template:', err);
        }
    };

    const handleEdit = (template: Template) => {
        setTitle(template.title);
        setTextBox(template.textBox);
        setEditingTemplate(template); 
        setTemplateCreate(true); 
    };


    useEffect(() => {
        const fetchTemplates = async () => {
        try {
            const response = await axios.get<Template[]>('http://localhost:3000/api/templates');
            setTemplates(response.data);
        } catch (err) {
            console.error('Error fetching templates:', err);
        }
        };

        fetchTemplates();
    }, []);



    return(
        <div>
            <div className="Template-Menu-Button">
                    <button onClick={toggleVisibility}>Templates</button>
            </div>
            <div className={`Template-Menu ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="Template-Menu-Button-Close" onClick={toggleVisibility}>
                        <img src="icons/x-solid.svg"></img>
                </div>
                {!templateCreater && (
                    <div className="Template-Menu-Selection">
                        <div className="Template-Header-Title">
                            <p>Templates</p>
                        </div> 
                        <ul className="Template-Menu-List"> 
                            {templates.map((item, index) => (
                                <li className="Template-Menu-List-Relative" key={index}>
                                    <div className="Template-Menu-Item" onClick={() => setSelectedTemplate(item)}>
                                        <p className="Template-Menu-Title">{item.title}</p>
                                        <p className="Template-Menu-Description">{item.textBox}</p>
                                    </div>
                                    <div className="Template-Menu-List-Delete" onClick={() => handleDelete(item.id)}>
                                        <img src="icons/trash-can-solid.svg"></img>
                                    </div>
                                    <div className="Template-Menu-List-Edit">
                                        <img src="icons/pen-to-square-regular.svg" onClick={() => handleEdit(item)}></img>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div
                            className="Template-Menu-Add-Container"
                            onClick={toggleCreaterVisibility}>
                            <div className="Template-Menu-Add-Template">
                                <img src="icons/plus-solid.svg" alt="Add Template"></img>
                            </div>
                            <p className="Template-Menu-Text">Add Template</p>
                        </div>
                    </div>
                )}
                {templateCreater && (
                    <>
                    <div className="Template-Header-Title">
                        <p>Templates Edit</p>
                    </div>
                    <div className="Template-Menu-Input-Areas">
                        <input
                            className="Template-Menu-Input-Field"
                            placeholder="Subject"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <textarea
                            placeholder="Message..."
                            className="Template-Menu-Input-Text"
                            value={textBox}
                            onChange={(e) => setTextBox(e.target.value)} />
                    </div>
                    <div className="Template-Menu-Buttons">
                        <button
                            className="Template-Menu-Save"
                            onClick={handleSubmit}>
                            Save
                        </button>
                        <button
                            className="Template-Menu-Cancel"
                            onClick={handleCancel}>
                                Cancel
                        </button>
                    </div>
                    </>
                )}       
            </div>
        </div>
    )
};

export default TemplateMenu;