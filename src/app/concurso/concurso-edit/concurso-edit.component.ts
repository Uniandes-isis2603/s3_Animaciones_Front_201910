import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConcursoService} from '../concurso.service';
import {ConcursoDetail} from '../concurso-detail';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-concurso-edit',
  templateUrl: './concurso-edit.component.html',
  styleUrls: ['./concurso-edit.component.css']
})
export class ConcursoEditComponent implements OnInit, OnChanges {

    constructor(private concursoService: ConcursoService, private toastService: ToastrService, private route: ActivatedRoute) { }

    @Input() concurso: ConcursoDetail;
    concurso_id: number;
    
    tecnicas: String[];

    @Output() cancel = new EventEmitter();

    @Output() update = new EventEmitter();

    editConcurso(): void {
        this.concursoService.updateConcurso(this.concurso).subscribe(() => {
            this.toastService.success("La informacion del concurso fue actualizada", "Concurso Edit");
        });
        this.update.emit();
    }

    cancelEdition(): void {
        this.cancel.emit();
    }

    getConcursoDetail(): void {
        this.concursoService.getConcursoDetail(this.concurso_id).subscribe(cd => {
            this.concurso = cd
        });
    }

    ngOnInit() {
        this.concurso_id = +this.route.snapshot.paramMap.get('id');
        if(this.concurso_id){
            this.concurso = new ConcursoDetail();
            this.getConcursoDetail();
        }
    }

    ngOnChanges(){
        this.ngOnInit()
        this.tecnicas = ['Libre', 'Animación Completa', 'Animación Limitada', 'Artista', 'Rotoscopia', 'Live-Action', 'Claymotion', 'Pixelation', 'Go-Motion', 'Con Recortes', 'Flash', 'Captura de Movimiento', 'Modelado 3D', 'Animación con arena', 'Pinscreen'];
    }

}
