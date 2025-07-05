import "./Categoria.css"

interface Props{
    name: string;
    index: number;
    setIndexCategoria: (index : number) => void;
};


function CategoriaComponente(props: Props){
    // Procedemos con renderizar el boton de categorias.
    return(
            <button className="categoria-button" onClick={() => props.setIndexCategoria(props.index)}>
                {props.name}
            </button>
    );
}

export default CategoriaComponente;