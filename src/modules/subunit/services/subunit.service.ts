import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubunitEntity } from '../subunit.entity';
import { Repository } from 'typeorm';
import { ICreateSubunitDto } from '../interfaces/ICreateSubunitDto';
import { IUpdateSubunitDto } from '../interfaces/IUpdateSubunitDto';
import { PersonalEntity } from 'src/modules/personal/personal.entity';
import { ISubunitEntity } from '../interfaces/ISubunit';



@Injectable()
export class SubunitService {

  constructor(
    @InjectRepository(SubunitEntity)
    private subunitRepository: Repository<SubunitEntity>,
    @InjectRepository(PersonalEntity)
    private personalRepository: Repository<PersonalEntity>,
  ){}

  async getAll(){
    return await this.subunitRepository.find({
      relations: {
        supervisor: true,
      }
    }).then(async (items) => {

      const itemBodies = [];

      for await(const item of items){
        if(item.supervisor != null)
        itemBodies.push(await this.drawOutData(item))
        else
        itemBodies.push(item)
      }

      return itemBodies
    })
  }

  async getOne(id: number){
    return await this.subunitRepository.findOne({relations: {
      supervisor: true
    }, where: {id}})
    .then(async (item) => {
      return await this.drawOutData(item);
    })
  }

  async createOne(body: ICreateSubunitDto){

    const {supervisor_inn, parent_subunit_id} = body;

    const newSubunitBody: ISubunitEntity = new SubunitEntity();

    if(supervisor_inn){
      const supervisor = await this.personalRepository.findOne({relations: {
        physical_face: true,
        position: true,
        subunit: true
      },
      where: {physical_face: {inn: supervisor_inn}}})
      if(!supervisor.position.supervisor_access){
        throw new Error('This position don`t have supervisor_access')
      }
      if(supervisor){
        newSubunitBody.supervisor = supervisor
      } else {
        throw new Error('No person with current inn')
      }
    } else {
      newSubunitBody.supervisor = null;
    }

    
    

    if(parent_subunit_id){
      const subunit = await this.subunitRepository.findOne({where: {id: parent_subunit_id}})
      if(!subunit){
        throw new Error('No subunit with current parent_subunit_id')
      }
    } 
    

    const newSubunit = this.subunitRepository.create({...body, ...newSubunitBody});

    return await this.subunitRepository.save(newSubunit);
  }

  async updateOne(id: number, body: IUpdateSubunitDto){

    const {supervisor_inn, parent_subunit_id} = body;

    const updatedSubunitBody: ISubunitEntity = new SubunitEntity();

    if(supervisor_inn){
      const supervisor = await this.personalRepository.findOne({relations: {
        physical_face: true,
        position: true,
        subunit: true
      },
      where: {physical_face: {inn: supervisor_inn}}})
      if(!supervisor.position.supervisor_access){
        throw new Error('This position don`t have supervisor_access')
      }
      if(supervisor){
        

        updatedSubunitBody.supervisor = supervisor
      } else {
        throw new Error('No person with current inn')
      }
    } 

    if(parent_subunit_id){

      if(id === parent_subunit_id){
        throw new Error('Subunit can`t be under itself')
      }
      updatedSubunitBody.parent_subunit_id = parent_subunit_id;
      const subunit = await this.subunitRepository.findOne({where: {id: parent_subunit_id}})
      if(!subunit){
        throw new Error('No subunit with current parent_subunit_id')
      }
    } 


    return await this.subunitRepository.update({id}, {...body, ...updatedSubunitBody});

  }

  async deleteOne(id: number){
    try{
      return await this.subunitRepository.delete({id});
    } catch (err) {
      throw err;
    }

  }


  async drawOutData(item: ISubunitEntity): Promise<ISubunitEntity> {
    return {...item, supervisor: await this.personalRepository.findOne({relations: {
      physical_face: true,
      position: true,
      subunit: true
    },
    where: {physical_face: {inn: item.supervisor_inn}}})}
  }
  

}
