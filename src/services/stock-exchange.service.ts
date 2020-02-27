import { Injectable } from '@angular/core';
import { StockExchange } from 'src/models/stock-exchange';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  port:number=8080

  httpUrl="http://localhost:"+this.port+"/stock-exchange/";

  constructor(private httpClient:HttpClient) { }

  saveStockExchange(stockExchange:StockExchange):Observable<StockExchange>{
    return this.httpClient.post<StockExchange>(this.httpUrl,stockExchange);
  }

  getAllStockExchanges():Observable<StockExchange[]>{
    return this.httpClient.get<StockExchange[]>(this.httpUrl);
  }

  getStockExchangeById(id:number):Observable<StockExchange>{
    return this.httpClient.get<StockExchange>(this.httpUrl + id);
  }

  updateStockExchange(stockExchange:StockExchange):Observable<StockExchange>{
    return this.httpClient.put<StockExchange>(this.httpUrl, stockExchange);
  }

}
