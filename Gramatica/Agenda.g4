/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar Agenda;

@header{
        import java.util.*;
        import java.lang.*;
        import static java.nio.file.StandardOpenOption.*;
        import java.nio.file.*;
        import java.io.*;
        import java.io.FileWriter;
        import java.io.IOException;
}

@members{
    class Horario{
        String hinicio;
        String hfim;

        public Horario(){
            this.hinicio = "";
            this.hfim = "";
        }

        public Horario(String hinicio,String hfim){
            this.hinicio = hinicio;
            this.hfim = hfim;
        }

        // get's
        public String getHinicio(){
            return this.hinicio;
        }
        
        public String getHfim(){
            return this.hfim;
        }

        // set's
        public void setHinicio(String hinicio){
            this.hinicio = hinicio;
        }

        public void setHfim(String hfim){
            this.hfim = hfim;
        }

        public boolean equals(Object o){
            if(this == o)
                return true;
            if((o==null || (o.getClass()!=this.getClass()))) 
               return false;
            Horario h = (Horario) o;
            return (this.hinicio.equals(h.getHinicio()) && this.hfim.equals(h.getHfim()));
        }
        
        public String toString(){
                StringBuilder s = new StringBuilder();
                s.append("Horario: \n");
                s.append("Hora de inicio: " + this.hinicio + "\n");
                s.append("Hora de fim: " + this.hfim + "\n");
                return s.toString();
        }
                   

    }

    class Evento{
        String data;
        Horario horario;
        String tipo;
        String designacao;
        String local;
        String informacao;

        public Evento(){
            this.data = "";
            this.horario = new Horario();
            this.tipo = "";
            this.designacao = "";
            this.local = "";
            this.informacao = "";
        }

        public Evento(String data,Horario horario,String tipo, String designacao, String local,String informacao){
            this.data = data;
            this.horario = horario;
            this.tipo = tipo;
            this.designacao = designacao;
            this.local = local;
            this.informacao = informacao;
        }

        // get's
        public String getData(){
            return this.data;
        }

        public Horario getHorario(){
            return this.horario;
        }

        public String getTipo(){
            return this.tipo;
        }
        
        public String getDesignacao(){
            return this.designacao;
        }

        public String getLocal(){
            return this.local;
        }

        public String getInformacao(){
            return this.informacao;
        }

        // set's

        public void setData(String data){
            this.data = data;
        }

        public void setHorario(Horario horario){
            this.horario = horario;
        }

        public void setTipo(String tipo){
            this.tipo = tipo;
        }
        
        public void setDesignacao(String designacao){
            this.designacao = designacao;
        }

        public void setLocal(String local){
            this.local = local;
        }

        public void setInformacao(String informacao){
            this.informacao = informacao;
        }

        public boolean equals(Object o){
            if(this == o)
                return true;
            if((o==null || (o.getClass()!=this.getClass()))) 
               return false;
            Evento e = (Evento) o;
            return (this.data.equals(e.getData()) && this.horario.equals(e.getHorario()) && 
                    this.tipo.equals(e.getTipo()) && this.designacao.equals(e.getDesignacao())
                    && this.local.equals(e.getLocal()) && this.informacao.equals(e.informacao));
        }

        public String toString(){
                StringBuilder s = new StringBuilder();
                s.append("Evento: \n");
                s.append("Data: " + this.data + "\n");
                s.append(this.horario.toString());
                s.append("Tipo: " + this.tipo + "\n");
                s.append("Designação: " + this.designacao + "\n");
                s.append("Local: " + this.local + "\n");
                s.append("Informação: " + this.informacao + "\n");
                return s.toString();
        }
    }
}

agenda returns[int totalEventos,HashMap<Integer,Evento> listaEventos]
      @after{
          
      }
      : 'Agenda' '---' eventos{
                               $agenda.totalEventos = $eventos.totalEventos;
                               $agenda.listaEventos = $eventos.listaEventos;

                               System.out.println("\n");
                               System.out.println("******************** Base de Dados ***********************");
                               try{
                                  FileWriter fileWriter = new FileWriter("/Users/tiagofraga/Desktop/PLC/PRI/Trabalhos/Local/TP/Gramatica/teste.json");
                                  String json;
                                  int count = 1;
                                  for(Integer i : $agenda.listaEventos.keySet()){
                                    if(count == 1){
                                         json = "[{\"data\": \""+ $agenda.listaEventos.get(i).getData().replaceAll("'","").replaceAll("_"," ")+ "\",\"horario\":{\"hinicio\":\"" + 
                                           $agenda.listaEventos.get(i).getHorario().getHinicio().replaceAll("'","").replaceAll("_"," ")+ "\",\"hfim\":\"" + $agenda.listaEventos.get(i).getHorario().getHfim().replaceAll("'","").replaceAll("_"," ") +
                                            "\"},\"tipo\":\"" + $agenda.listaEventos.get(i).getTipo().replaceAll("'","").replaceAll("_"," ") + "\",\"designacao\":\"" + $agenda.listaEventos.get(i).getDesignacao().replaceAll("'","").replaceAll("_"," ")+ 
                                            "\",\"local\":\"" + $agenda.listaEventos.get(i).getLocal().replaceAll("'","").replaceAll("_"," ") + "\",\"informacao\":\"" + $agenda.listaEventos.get(i).getInformacao().replaceAll("'","").replaceAll("_"," ")+ "\"},\n";
                                    
                                    } 
                                    else if(count == $agenda.listaEventos.size()){
                                      json = "{\"data\":\""+ $agenda.listaEventos.get(i).getData().replaceAll("'","").replaceAll("_"," ")+ "\",\"horario\":{\"hinicio\":\"" + 
                                           $agenda.listaEventos.get(i).getHorario().getHinicio().replaceAll("'","").replaceAll("_"," ") + "\",\"hfim\":\"" + $agenda.listaEventos.get(i).getHorario().getHfim().replaceAll("'","").replaceAll("_"," ") +
                                            "\"},\"tipo\":\"" + $agenda.listaEventos.get(i).getTipo().replaceAll("'","").replaceAll("_"," ") + "\",\"designacao\":\"" + $agenda.listaEventos.get(i).getDesignacao().replaceAll("'","").replaceAll("_"," ") + 
                                            "\",\"local\":\"" + $agenda.listaEventos.get(i).getLocal().replaceAll("'","").replaceAll("_"," ")+ "\",\"informacao\":\"" + $agenda.listaEventos.get(i).getInformacao().replaceAll("'","").replaceAll("_"," ") + "\"}]"; 
                                    }    
                                    else{
                                        json = "{\"data\": \""+ $agenda.listaEventos.get(i).getData().replaceAll("'","").replaceAll("_"," ")+ "\",\"horario\":{\"hinicio\":\"" + 
                                           $agenda.listaEventos.get(i).getHorario().getHinicio().replaceAll("'","").replaceAll("_"," ")+ "\",\"hfim\":\"" + $agenda.listaEventos.get(i).getHorario().getHfim().replaceAll("'","").replaceAll("_"," ") +
                                            "\"},\"tipo\":\"" + $agenda.listaEventos.get(i).getTipo().replaceAll("'","").replaceAll("_"," ") + "\",\"designacao\":\"" + $agenda.listaEventos.get(i).getDesignacao().replaceAll("'","").replaceAll("_"," ")+ 
                                            "\",\"local\":\"" + $agenda.listaEventos.get(i).getLocal().replaceAll("'","").replaceAll("_"," ") + "\",\"informacao\":\"" + $agenda.listaEventos.get(i).getInformacao().replaceAll("'","").replaceAll("_"," ")+ "\"},\n"; 
                                    }
                                    count++;
                                    fileWriter.write(json);
                                    System.out.println(json);
                                  }
                                  fileWriter.close();
                               }
                               catch (Exception er){
                                     er.printStackTrace();
                               }
                           }
      ;                     

eventos returns[int totalEventos,HashMap<Integer,Evento> listaEventos]
       @init{
           $eventos.listaEventos = new HashMap<Integer,Evento>();
           $eventos.totalEventos = 1;
       } 
       : (evento[$eventos.totalEventos] {
           int introduzir = $evento.introduzir;
           if(introduzir == 0){
                System.out.println("Erro: Evento nº " + $eventos.totalEventos +  " não introduzido!!!");
           }
           else{
                $eventos.listaEventos.put($eventos.totalEventos,$evento.e);
                $eventos.totalEventos++;
           }
        } '.')+
       ;

evento[int totalEventos] returns[Evento e,int introduzir]
@init{
      $evento.introduzir = 0;
      }
       : 'Evento' '---' 
       data 
       {
        String dia = "" + $data.valorDia;
        String mes = "" + $data.valorMes;
        String ano = "" + $data.valorAno;
        System.out.println("DIA: " + dia);
        System.out.println("MES: " + mes);
        System.out.println("ANO: " + ano);
        String valorData = dia + "/" + mes + "/" + ano;
       } ',' horario?
       {
        Horario valorHorario = $horario.h;
       } ',' tipo 
       {
        String valorTipo = $tipo.valor;  
       } ',' designacao? 
       {
        String valorDesignacao = $designacao.valor;
       } ',' local?
       {
        String valorLocal = $local.valor;   
       } ',' informacao?
       {
        String valorInformacao = $informacao.valor;
        
        if($data.erro.equals("Erro na Data")){
           System.out.println($data.erro);           
        }
        else{
             if($horario.erro.equals("Erro no Horario")){
                System.out.println($horario.erro);
             }
             else{ 
                $evento.introduzir = 1;
                $evento.e = new Evento(valorData,valorHorario,valorTipo,valorDesignacao,valorLocal,valorInformacao);
             }
            }
        }
      ;

data returns[int valorDia,int valorMes,int valorAno,String erro]
    @init{
         $data.erro = "";
    }
    : 'Data' ':' '(' NUM {$data.valorDia = $NUM.int;} ',' NUM {$data.valorMes = $NUM.int;} ',' 
      NUM {
           $data.valorAno= $NUM.int;
            if($data.valorAno < 2019){
               $data.erro= "Erro na Data";
            }
            else{
                 if($data.valorMes <= 0 || $data.valorMes > 12){
                    $data.erro= "Erro na Data";
                 }
                 else{
                      if($data.valorDia <= 0 || $data.valorDia > 31){
                          $data.erro= "Erro na Data";                    
                      }
                      else{
                            if($data.valorMes == 2){
                                if($data.valorDia > 28){
                                    $data.erro= "Erro na Data";
                                }
                            }
                            else{
                               if($data.valorMes == 4 || $data.valorMes == 6 || $data.valorMes == 9 || $data.valorMes == 11 ){
                                     if($data.valorDia > 30){
                                        $data.erro= "Erro na Data";                     
                                     }                                                                                        
                               }
                            }
                      }
                      
                 }
                 
           }
                                                                                                   
         }')'
    ;

horario returns[Horario h,String erro]
       @init{
             $horario.erro = "";
       }
       : hinicio{String hiHoras = "" + $hinicio.horas;
                 String hiMin = "" + $hinicio.minutos;
                 String valorHinicio = hiHoras + ":" + hiMin;} '-' hfim {String hfHoras = "" + $hfim.horas;
                                                                         String hfMin = "" + $hfim.minutos;
                                                                         String valorHfim = hfHoras + ":" + hfMin;
                                                                         if($hinicio.horas > $hfim.horas){
                                                                            $horario.erro = "Erro no Horario";
                                                                         }
                                                                         else{
                                                                             if($hinicio.horas == $hfim.horas && $hinicio.minutos >= $hfim.minutos){
                                                                                $horario.erro = "Erro no Horario";         
                                                                             }
                                                                             else{
                                                                                  $horario.h = new Horario(valorHinicio,valorHfim);
                                                                             }
                                                                         }
                                                                         
                                                                 }
       ;

hinicio returns [int horas,int minutos]
       : 'HoradeInicio' ':' '(' NUM {$hinicio.horas = $NUM.int;} ':' NUM {$hinicio.minutos = $NUM.int;}')' 
       ;

hfim returns [int horas,int minutos]
    : 'HoradeFim' ':' '(' NUM {$hfim.horas = $NUM.int;} ':' NUM {$hfim.minutos = $NUM.int;}')' 
    ;

tipo returns [String valor]
    : 'Tipo' ':' TEXTO {$tipo.valor = $TEXTO.text;}
    ;

designacao returns [String valor]
          : 'Designacao' ':' TEXTO {$designacao.valor = $TEXTO.text;}
          ;

local returns [String valor]
      : 'Local' ':' TEXTO {$local.valor = $TEXTO.text;}
      ;

informacao returns [String valor]
          : 'Informacao' ':' TEXTO {$informacao.valor = $TEXTO.text;}
          ;

NUM : ('0'..'9')+
    ;

DIA : ('0'..'9')+
    ;

MES : ('0'..'9')+
    ;

ANO : ('0'..'9')+
    ;

TEXTO: [a-zA-Z]+ 
     ;

CHAR : [.;-]
     ;

WS : [ \t\r\n]  -> skip
   ;
