import React, { Component } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getArticles } from './services/api';
import { getCategories } from './services/api';
import { addNewArticle } from './services/api';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../styles/marTicles.css';

export class Articles extends Component {

    emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            categories: null,
            submitted: false,
            globalFilter: null
        };

        //this.getArticles = new getArticles();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.importCSV = this.importCSV.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    componentDidMount() {

        getArticles('resources')
        .then(art => 
            {

                let res = art.map(position => ({...position}))
                console.log(res);
                
            this.setState({ products: res})});
        getCategories('res')
        .then(cat => 
            {

                //let res = cat.map(position => ({...position}))
                console.log(cat);
                cat.map((index,ind)=>{
                    console.log(index.name);
                    console.log(cat[ind].name);
                    
                })
            this.setState({ categories: cat})});
        
       
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    hideDeleteProductsDialog() {
        this.setState({ deleteProductsDialog: false });
    }

    saveProduct() {
        let state = { submitted: true };

        if (this.state.product.title.trim()) {
            let products = [...this.state.products];
            let product = {...this.state.product};
            addNewArticle(this.state.product)
            .then(cat => 
                {
                  if(cat.data==='Articles added!'){
                    if (this.state.product.id) {
                        const index = this.findIndexById(this.state.product.id);
        
                        products[index] = product;
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    }
                    else {
                        product.id = this.createId();
                        product.image = 'product-placeholder.svg';
                        products.push(product);
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Article Created', life: 3000 });
                    }
                    state = {
                        ...state,
                        products,
                        productDialog: false,
                        product: this.emptyProduct
                    };
                  }else{
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Creating Article has failed', life: 3000 });

                  }
                   
                    })
          

   
        }

        this.setState(state);
    }

    editProduct(product) {
        this.setState({
            product: { ...product },
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    importCSV(e) {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = this.createId();
                return processedData;
            });

            const products = [...this.state.products, ...importedData];

            this.setState({ products });
        };

        reader.readAsText(file, 'UTF-8');
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteProductsDialog: true });
    }

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedProducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedProducts: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    onCategoryChange(e) {
        let product = {...this.state.product};
        product['category_id'] = e.target.name;
        console.log(e.name)
        this.setState({ product });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let product = {...this.state.product};
        product[`${name}`] = val;

        this.setState({ product });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let product = {...this.state.product};
        product[`${name}`] = val;

        this.setState({ product });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={this.importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    imageBodyTemplate(rowData) {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }


    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="mx-0 my-1">Manage Products</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
        const deleteProductsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
            </React.Fragment>
        );
        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.products} selection={this.state.selectedProducts} onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="title" header="Title" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="content" header="Content" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="category_id" header="Category" sortable style={{ minWidth: '12rem' }}></Column>

{/*                         <Column field="image" header="Image" body={this.imageBodyTemplate}></Column>
                        <Column field="category_id" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                         <Column field="rating" header="Reviews" body={this.ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={this.statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
 */} 
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    {this.state.product.image && <img src={`images/product/${this.state.product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.product.image} className="product-image block m-auto pb-3" />}
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" value={this.state.product.title} onChange={(e) => this.onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.title })} />
                        {this.state.submitted && !this.state.product.title && <small className="p-error">Title is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="title">Content</label>
                        <InputText id="content" value={this.state.product.content} onChange={(e) => this.onInputChange(e, 'content')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.content })} />
                        {this.state.submitted && !this.state.product.content && <small className="p-error">Content is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" value={this.state.product.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label className="mb-3">Category</label>
                        <div className="formgrid grid">
                        {this.state.categories && this.state.categories[0] && this.state.categories.map((index,ind)=>{

                          return(
                            <div className="field-radiobutton col-6">
                               
                                    
                                <RadioButton key={index._id} id={index._id} inputId={index._id} name={index._id} value={index.name} onChange={this.onCategoryChange}  />
                                <label htmlFor="category1">{index.name}</label>
                                
                             
                            </div>
                               )
                            })}
                        </div>
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}
export default Articles;