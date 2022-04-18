using ItemsApp_API.Entities;
using System;

namespace ItemsApp_API.Dtos
{
    public class PurnchaseOrderDto
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public DateTime CreationDate { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string SubmittedBy { get; set; }

        public double TotalPrice { get; set; }
    }
}
